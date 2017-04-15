<template>
<nav class="main-nav navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggler collapsed" data-target="#example-navbar-toolbar-1" data-toggle="collapse">
                  <span class="sr-only">Toggle navigation</span>
                  <i class="fa fa-navicon" aria-hidden="true"></i>
                </button>
            <button type="button" class="navbar-toggler collapsed" data-target="#example-navbar-search-1" data-toggle="collapse">
                  <span class="sr-only">Toggle Search</span>
                  <i class="fa fa-search" aria-hidden="true"></i>
                </button>
                <router-link to="/" class="navbar-brand"> <i class="fa fa-navicon" aria-hidden="true"></i></router-link>

          
        </div>
        <div class="collapse navbar-search navbar-left" id="example-navbar-search-1">
            <form class="navbar-form form-inline quick-search" role="search">
                <div class="input-group">
                    <input class="form-control" name="kwd" v-model="kwd" v-on:keyup="search($event)" autocomplete="off" id="kwd" placeholder="Quick search" type="text">
                    <div class="input-group-btn">
                        <button type="button" class="btn btn-primary"><span class="fa fa-2x fa-angle-double-right"></span></button>
                    </div>
                </div>
            </form>
        </div>
        <div class="collapse navbar-collapse navbar-collapse-toolbar" id="example-navbar-toolbar-1">
            <ul class="nav navbar-toolbar navbar-right navbar-toolbar-right">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false" role="button">Nasa</a>
                    <div class="dropdown-menu" role="menu">
                        <a class="dropdown-item" href="javascript:void(0)" role="menuitem">Action</a>
                        <a class="dropdown-item" href="javascript:void(0)" role="menuitem">Another action</a>
                        <a class="dropdown-item" href="javascript:void(0)" role="menuitem">Something else here</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="javascript:void(0)" role="menuitem">Separated link</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="javascript:void(0)" role="menuitem">One more separated link</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" aria-expanded="false" role="button">
                        <i class="fa fa-plus" aria-hidden="true"></i>
                    </a>

                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link" data-toggle="dropdown" href="javascript:void(0)" title="Notifications" aria-expanded="false" data-animation="slide-bottom" role="button">
                        <i class="fa fa-bell" aria-hidden="true"></i>
                        <span class="tag tag-pill tag-danger up">5</span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right dropdown-menu-media" role="menu">
                        <div class="dropdown-menu-header">
                            <h5>NOTIFICATIONS</h5>
                            <span class="tag tag-round tag-danger">New 5</span>
                        </div>
                        <div class="list-group">
                            <div data-role="container">
                                <div data-role="content">
                                    <a class="list-group-item dropdown-item" href="javascript:void(0)" role="menuitem">
                                        <div class="media">
                                            <div class="media-left p-r-10">
                                                <i class="icon wb-order bg-red-600 white icon-circle" aria-hidden="true"></i>
                                            </div>
                                            <div class="media-body">
                                                <h6 class="media-heading">A new order has been placed</h6>
                                                <time class="media-meta" datetime="2017-06-12T20:50:48+08:00">5 hours ago</time>
                                            </div>
                                        </div>
                                    </a>
                                    <a class="list-group-item dropdown-item" href="javascript:void(0)" role="menuitem">
                                        <div class="media">
                                            <div class="media-left p-r-10">
                                                <i class="icon wb-user bg-green-600 white icon-circle" aria-hidden="true"></i>
                                            </div>
                                            <div class="media-body">
                                                <h6 class="media-heading">Completed the task</h6>
                                                <time class="media-meta" datetime="2017-06-11T18:29:20+08:00">2 days ago</time>
                                            </div>
                                        </div>
                                    </a>
                                    <a class="list-group-item dropdown-item" href="javascript:void(0)" role="menuitem">
                                        <div class="media">
                                            <div class="media-left p-r-10">
                                                <i class="icon wb-settings bg-red-600 white icon-circle" aria-hidden="true"></i>
                                            </div>
                                            <div class="media-body">
                                                <h6 class="media-heading">Settings updated</h6>
                                                <time class="media-meta" datetime="2017-06-11T14:05:00+08:00">2 days ago</time>
                                            </div>
                                        </div>
                                    </a>
                                    <a class="list-group-item dropdown-item" href="javascript:void(0)" role="menuitem">
                                        <div class="media">
                                            <div class="media-left p-r-10">
                                                <i class="icon wb-calendar bg-blue-600 white icon-circle" aria-hidden="true"></i>
                                            </div>
                                            <div class="media-body">
                                                <h6 class="media-heading">Event started</h6>
                                                <time class="media-meta" datetime="2017-06-10T13:50:18+08:00">3 days ago</time>
                                            </div>
                                        </div>
                                    </a>
                                    <a class="list-group-item dropdown-item" href="javascript:void(0)" role="menuitem">
                                        <div class="media">
                                            <div class="media-left p-r-10">
                                                <i class="icon wb-chat bg-orange-600 white icon-circle" aria-hidden="true"></i>
                                            </div>
                                            <div class="media-body">
                                                <h6 class="media-heading">Message received</h6>
                                                <time class="media-meta" datetime="2017-06-10T12:34:48+08:00">3 days ago</time>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="dropdown-menu-footer">
                            <a class="dropdown-menu-footer-btn" href="javascript:void(0)" role="button">
                                <i class="icon md-settings" aria-hidden="true"></i>
                            </a>
                            <a class="dropdown-item" href="javascript:void(0)" role="menuitem">
                        All notifications
                      </a>
                        </div>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link" data-toggle="dropdown" href="javascript:void(0)" title="Messages" aria-expanded="false" data-animation="slide-bottom" role="button">
                        <i class="fa fa-comments" aria-hidden="true"></i>
                        <span class="tag tag-pill tag-info up">3</span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right dropdown-menu-media" role="menu">
                        <div class="dropdown-menu-header" role="presentation">
                            <h5>MESSAGES</h5>
                            <span class="tag tag-round tag-info">New 3</span>
                        </div>
                        <div class="list-group" role="presentation">
                            <div data-role="container">
                                <div data-role="content">
                                    <a class="list-group-item" href="javascript:void(0)" role="menuitem">
                                        <div class="media">
                                            <div class="media-left p-r-10">
                                                <span class="avatar avatar-sm avatar-online">
                                    <img src="http://i.imgur.com/kjnUHay.jpg" alt="..." />
                                    <i></i>
                                  </span>
                                            </div>
                                            <div class="media-body">
                                                <h6 class="media-heading">Mary Adams</h6>
                                                <div class="media-meta">
                                                    <time datetime="2017-06-17T20:22:05+08:00">30 minutes ago</time>
                                                </div>
                                                <div class="media-detail">Anyways, i would like just do it</div>
                                            </div>
                                        </div>
                                    </a>
                                    <a class="list-group-item" href="javascript:void(0)" role="menuitem">
                                        <div class="media">
                                            <div class="media-left p-r-10">
                                                <span class="avatar avatar-sm avatar-off">
                                    <img src="http://i.imgur.com/kjnUHay.jpg" alt="..." />
                                    <i></i>
                                  </span>
                                            </div>
                                            <div class="media-body">
                                                <h6 class="media-heading">Caleb Richards</h6>
                                                <div class="media-meta">
                                                    <time datetime="2017-06-17T12:30:30+08:00">12 hours ago</time>
                                                </div>
                                                <div class="media-detail">I checheck the document. But there seems</div>
                                            </div>
                                        </div>
                                    </a>
                                    <a class="list-group-item" href="javascript:void(0)" role="menuitem">
                                        <div class="media">
                                            <div class="media-left p-r-10">
                                                <span class="avatar avatar-sm avatar-busy">
                                    <img src="http://i.imgur.com/kjnUHay.jpg" alt="..." />
                                    <i></i>
                                  </span>
                                            </div>
                                            <div class="media-body">
                                                <h6 class="media-heading">June Lane</h6>
                                                <div class="media-meta">
                                                    <time datetime="2017-06-16T18:38:40+08:00">2 days ago</time>
                                                </div>
                                                <div class="media-detail">Lorem ipsum Id consectetur et minim</div>
                                            </div>
                                        </div>
                                    </a>
                                    <a class="list-group-item" href="javascript:void(0)" role="menuitem">
                                        <div class="media">
                                            <div class="media-left p-r-10">
                                                <span class="avatar avatar-sm avatar-away">
                                    <img src="http://i.imgur.com/kjnUHay.jpg" alt="..." />
                                    <i></i>
                                  </span>
                                            </div>
                                            <div class="media-body">
                                                <h6 class="media-heading">Edward Fletcher</h6>
                                                <div class="media-meta">
                                                    <time datetime="2017-06-15T20:34:48+08:00">3 days ago</time>
                                                </div>
                                                <div class="media-detail">Dolor et irure cupidatat commodo nostrud nostrud.</div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="dropdown-menu-footer" role="presentation">
                            <a class="dropdown-menu-footer-btn" href="javascript:void(0)" role="button">
                                <i class="icon wb-settings" aria-hidden="true"></i>
                            </a>
                            <a class="dropdown-item" href="javascript:void(0)" role="menuitem">
                        See all messages
                      </a>
                        </div>
                    </div>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link" data-toggle="dropdown" href="javascript:void(0)" title="Notifications" aria-expanded="false" data-animation="slide-bottom" role="button">
                        <i class="fa fa-gear" aria-hidden="true"></i>
                    </a>
                    <div class="dropdown-menu" role="menu">
                        <a class="dropdown-item" href="javascript:void(0)" role="menuitem">Action</a>
                        <a class="dropdown-item" href="javascript:void(0)" role="menuitem">Another action</a>
                        <a class="dropdown-item" href="javascript:void(0)" role="menuitem">Something else here</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="javascript:void(0)" role="menuitem">Separated link</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="javascript:void(0)" role="menuitem">One more separated link</a>
                    </div>
                </li>

            </ul>

        </div>
    </div>
</nav>
</template>

<script>
export default {

    data(){
        return{
            kwd:''
        }
    },

    // computed: {
    //     auth() {
    //         return this.$store.state.member.status
    //     },
    //     user() {
    //         return this.$store.state.member.user
    //     }
    // },
    methods: {
        search(e){

            var t = null;
            var _this = this;

            if(e.keyCode==13){
                return false;
                 
            }else{
                clearTimeout(t);
                    t = setTimeout(function(){
                        _this.$router.push('/search/'+  _this.kwd);
                    }, 500);


            }
        }
    }

}
</script>
