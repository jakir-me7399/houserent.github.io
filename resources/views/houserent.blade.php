<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="google-site-verification" content="zvgf7X-1W9zHqAc3x0neBkCDwNzocIXB6OGNbSt8R2U" />
  <meta name="csrf-token" content="{{csrf_token()}}" />
  <title>It's Brain - premium responsive admin template by Eugene Kopyov</title>

  <!-- <link href="{{url('asset/lib/font-awesome/css/font-awesome.css')}}" rel="stylesheet"> -->
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
  <!-- <link href="{{url('asset/lib/Ionicons/css/ionicons.css')}}" rel="stylesheet"> -->
  <link href="{{url('asset/lib/perfect-scrollbar/css/perfect-scrollbar.css')}}" rel="stylesheet">
  <link href="{{url('asset/lib/jquery-switchbutton/jquery.switchButton.css')}}" rel="stylesheet">
  <link href="{{url('asset/lib/highlightjs/github.css')}}" rel="stylesheet">
  <link href="{{url('asset/lib/datatables/jquery.dataTables.css')}}" rel="stylesheet">
  <link href="{{url('asset/lib/rickshaw/rickshaw.min.css')}}" rel="stylesheet">
  <link href="{{url('asset/lib/chartist/chartist.css')}}" rel="stylesheet">

  <!-- Bracket CSS -->
  <link rel="stylesheet" href="{{url('asset/css/bracket.css')}}">
  <link rel="stylesheet" media="print" href="{{url('asset/css/invoice.css')}}">
</head>

<body>
  <div id="root"></div>

  <!-- app js -->
  <script src="{{url('js/app.js')}}"></script>

  <script src="{{url('asset/lib/jquery/jquery.js')}}"></script>
  <script src="{{url('asset/lib/popper.js/popper.js')}}"></script>
  <script src="{{url('asset/lib/bootstrap/bootstrap.js')}}"></script>
  <script src="{{url('asset/lib/perfect-scrollbar/js/perfect-scrollbar.jquery.js')}}"></script>
  <script src="{{url('asset/lib/moment/moment.js')}}"></script>
  <script src="{{url('asset/lib/jquery-ui/jquery-ui.js')}}"></script>
  <script src="{{url('asset/lib/jquery-switchbutton/jquery.switchButton.js')}}"></script>
  <!-- <script src="{{url('asset/lib/chartist/chartist.js')}}"></script>
    <script src="{{url('asset/lib/jquery.sparkline.bower/jquery.sparkline.min.js')}}"></script>
    <script src="{{url('asset/lib/d3/d3.js')}}"></script>
    <script src="{{url('asset/lib/rickshaw/rickshaw.min.js')}}"></script> -->
  <script src="{{url('asset/lib/peity/jquery.peity.js')}}"></script>
  <script src="{{url('asset/lib/parsleyjs/parsley.js')}}"></script>


  <script src="{{url('asset/js/bracket.js')}}"></script>
  <!-- <script src="{{url('asset/js/ResizeSensor.js')}}"></script>
  <script src="{{url('asset/js/dashboard.js')}}"></script> -->
  <script>
    $(function() {
      'use strict'

      $(function() {
        'use strict';

        $('#selectForm').parsley();
        $('#selectForm2').parsley();
      });

      // FOR DEMO ONLY
      // menu collapsed by default during first page load or refresh with screen
      // having a size between 992px and 1299px. This is intended on this page only
      // for better viewing of widgets demo.
      $(window).resize(function() {
        minimizeMenu();
      });

      minimizeMenu();

      function minimizeMenu() {
        if (window.matchMedia('(min-width: 992px)').matches && window.matchMedia('(max-width: 1299px)').matches) {
          // show only the icons and hide left menu label by default
          $('.menu-item-label,.menu-item-arrow').addClass('op-lg-0-force d-lg-none');
          $('body').addClass('collapsed-menu');
          $('.show-sub + .br-menu-sub').slideUp();
        } else if (window.matchMedia('(min-width: 1300px)').matches && !$('body').hasClass('collapsed-menu')) {
          $('.menu-item-label,.menu-item-arrow').removeClass('op-lg-0-force d-lg-none');
          $('body').removeClass('collapsed-menu');
          $('.show-sub + .br-menu-sub').slideDown();
        }
      }
    });
  </script>
</body>

</html>