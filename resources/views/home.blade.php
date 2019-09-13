@extends('voyager::master')

@section('page_title','home')

@section('content')
    <div class="page-content container-fluid">
        @include('voyager::alerts')
        <div id="app">
            <div class="row">
                <div class="col-md-12">
                    <div class="admin-section-title">
                        <h3><i class="voyager-images"></i> {{ __('voyager::generic.media') }}</h3>
                    </div>
                    <div class="clear"></div>
                    <div class="toolbar"
                         style="background-color: #e0e0e0;padding: 20px; border-top-left-radius: 3px; border-top-right-radius: 3px;"></div>
                    {{-- <example-component></example-component> --}}
                    <router-view></router-view>

                </div><!-- .row -->
            </div><!-- .col-md-12 -->
        </div>

    </div><!-- .page-content container-fluid -->

@stop

{{--<script type="text/javascript">
    window.addEventListener("load", function () {
        // import UserHome from "./UserHome";
        var main = new Vue({
            el: "#app",
            data: {
                message: "hello!",

                errors: {}
            },
            watch: {
                /*   cmpName: function(val) {
                       this.slug = val.toLowerCase().replace(/\s+/g, "-");
                   }*/
            },
            components: {
                // UserHome
            },
            methods: {},
            mounted() {
                console.log('homeblade');
            },

        });
    });
</script>--}}
@section('javascript')
  {{--  <link rel="stylesheet" type="text/css" href="http://unpkg.com/iview/dist/styles/iview.css">
    <script type="text/javascript" src="http://vuejs.org/js/vue.min.js"></script>
    <script type="text/javascript" src="http://unpkg.com/iview/dist/iview.min.js"></script>--}}
    <!-- Scripts -->
  {{--  <script src="{{ asset('js/app.js') }}" defer></script>--}}
@endsection



