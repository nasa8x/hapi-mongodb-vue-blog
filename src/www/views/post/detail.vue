<template>
<div class="main-content container">
    <div class="row">
        <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12">
            <div class="card card-shadow" v-if="info">
                <div class="card-img-top cover overlay overlay-hover">
                    <img class="cover-image overlay-figure overlay-spin img-fluid" :src="info.img" alt="">
                    <div class="overlay-panel overlay-background overlay-fade">
                        <h2 class="card-title">{{info.tl}}</h2>
                        <p>{{info.desc}}</p>
                    </div>

                </div>
                <div class="card-block">
                    <h3 class="card-title">{{info.tl}}</h3>
                    <p class="card-text">
                        <span class="text-muted" v-text="dateFormat(info.crt)"></span>
                    </p>

                </div>
                <div class="card-block">
                    <p><strong>{{info.desc}}</strong></p>
                    <p class="card-text" v-html="markdownIt(info.htm)"></p>
                </div>

            </div>


            <div class="row thumb-view">
                <div class="col-lg-6 col-md-12" v-for="(doc, index) in suggest">
                    <div class="card card-shadow">
                        <div class="card-img-top cover overlay overlay-hover">
                            <router-link :to="{name:'post-detail', params: {id: doc.sid}}">
                                <img class="cover-image overlay-figure overlay-spin img-fluid" :src="doc.img" :alt="doc.tl" />
                            </router-link>
                        </div>
                        <div class="card-block">
                            <router-link :to="{name:'post-detail', params: {id: doc.sid}}">
                                <h5 class="card-title">{{doc.tl}}</h5>
                            </router-link>

                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="col-lg-4 col-md-12 col-sm-12">

            <div class="panel">
                <div class="panel-heading">
                    <h3 class="panel-title">Subscribe</h3>
                </div>
                <div class="panel-body">
                    <form class="form-group">
                        <input type="text" class="form-control" name="name" autocomplete="off" placeholder="Name">
                    </form>
                    <div class="form-group">
                        <input type="email" class="form-control" name="email" autocomplete="off" placeholder="Email Address">
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-primary btn-block btn-lg">Subcribe!</button>
                    </div>
                </div>

            </div>


            <div class="card card-shadow" v-for="(doc, index) in recommended">
                <div class="card-img-top cover overlay overlay-hover">
                    <router-link :to="{name:'post-detail', params: {id: doc.sid}}">
                        <img class="cover-image overlay-figure overlay-spin img-fluid" :src="doc.img" :alt="doc.tl" />
                    </router-link>
                </div>
                <div class="card-block">
                    <router-link :to="{name:'post-detail', params: {id: doc.sid}}">
                        <h5 class="card-title">{{doc.tl}}</h5>
                    </router-link>

                </div>
            </div>

        </div>

    </div>
</div>
</template>


<script>
import moment from 'moment';
import marked from 'marked';
import { mapGetters } from 'vuex'
export default {

  
    computed: {
        ...mapGetters({
            suggest: 'suggest',
            recommended: 'recommended',
            info: 'info'
        })
    },


    methods: {

        fetchInfo() {
            if (this.$route.params.id)
                this.$store.dispatch('POST_DETAIL', { id: this.$route.params.id });
        },
        markdownIt(txt) {
            return txt ? marked(txt, { breaks: true }) : '';
        },
        dateFormat(val) {
            return val ? moment(val).format('YYYY-MM-DD HH:MM A') : '';
        }


    },
    created() {
        this.fetchInfo();
    },
    watch: {
        '$route': 'fetchInfo'
    },
}
</script>
