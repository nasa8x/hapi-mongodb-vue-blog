<template>
<div class="main-content container">
    <div class="thumb-view row" data-plugin="masonry">
        <div class="col-xs-12 col-lg-4 col-md-6 col-sm-12 masonry-item" v-for="(doc, index) in docs">
            <!-- Widget -->
            <div class="card card-shadow">
                <div class="card-img-top cover overlay overlay-hover">
                    <router-link :to="{name:'post-detail', params: {id: doc.sid}}">
                        <img class="cover-image overlay-figure overlay-spin img-fluid" :src="doc.img" :alt="doc.tl">
                    </router-link>
                    <div class="ribbon ribbon-badge ribbon-primary ribbon-reverse" v-if="doc.stt==2">
                        <span class="ribbon-inner">HOT</span>
                    </div>
                </div>
                <div class="card-block">
                    <router-link :to="{name:'post-detail', params: {id: doc.sid}}">
                        <h5 class="card-title">{{doc.tl}}</h5>
                    </router-link>
                    <p class="card-text">
                        <span class="text-muted">{{dateFormat(doc.crt)}}</span>
                    </p>
                </div>

            </div>
            <!-- End Widget -->
        </div>
    </div>
    <!-- Pagination -->
    <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading" spinner="waveDots">
        <span slot="no-more">There is no more results :(</span>
    </infinite-loading>
    <!-- End Pagination -->
  </div>
</template>


<script>
import InfiniteLoading from 'vue-infinite-loading'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
    components: {
        InfiniteLoading
    },
    computed: {
        ...mapGetters({
            page: 'page',
            pages: 'pages',
            docs: 'docs'
        })
    },
    

    methods: {
       
       onInfinite() {
            var kwd = this.$route.params.kwd?this.$route.params.kwd:'';
            var _this = this;

            setTimeout(function(){
            _this.$store.dispatch('POST_FETCH', { page: _this.page, search: kwd }).then((res) => {
                if (_this.docs.length>0) {
                    _this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                    if (_this.page > _this.pages) {
                        _this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                    }
                } else {
                    _this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                }
            });
            }, 1000);
            
        },

       fetch() {
            if (this.$refs.infiniteLoading)
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            this.$store.dispatch('POST_CLEAN');
            this.onInfinite();

        },
        dateFormat(val) {
            return val ? moment(val).format('YYYY-MM-DD HH:MM A') : '';
        }
    },
    created() {
        this.fetch();
    },
    watch: {
        '$route': 'fetch'
    }
}
</script>
