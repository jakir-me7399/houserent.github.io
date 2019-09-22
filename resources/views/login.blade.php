<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Quickstart pack</title>

    <!-- favicon icon -->
    <link rel="shourtcut icon" href="" type="image/png">

    <!-- bootstrap css -->
    <link href="{{url('login/css/bootstrap.min.css')}}" rel="stylesheet">

    <!-- style css -->
    <link href="{{url('login/css/style.css')}}" rel="stylesheet">

    <!-- responsive css -->
    <link href="{{url('login/css/responsive.css')}}" rel="stylesheet">

    <!-- jquery slim js -->
    <script src="{{('login/js/jquery-3.2.1.slim.min.js')}}"></script>

</head>

<body>
    <section id="owner_reg">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="owner-reg-form">
                        <form action="#">
                            {{ csrf_field() }}
                            <h3 class="form-title">Owner singup form</h3>
                            <div class="form-group">
                                <label for="owner_name">Full Name</label>
                                <input type="text" class="form-control" id="owner_name" placeholder="Full Name" />
                            </div>
                            <div class="form-group">
                                <label for="owner_email">Email</label>
                                <input type="email" class="form-control" id="owner_email" placeholder="Enter your email" />
                            </div>
                            <div class="form-group">
                                <label for="owner_phone">Phone Number</label>
                                <input type="number" class="form-control" id="owner_phone" placeholder="Enter your phone number" />
                            </div>
                            <div class="form-group">
                                <label for="owner_nid">NID Number</label>
                                <input type="number" class="form-control" id="owner_nid" placeholder="Enter your nid number" />
                            </div>
                            <div class="form-group">
                                <!-- btn btn-outline-success -->
                                <label for="owner_nid_copy" class="form-control">NID Scan Copy</label>
                                <input type="file" class="form-control" id="owner_nid_copy" style="display: none;" />
                            </div>
                            <div class="form-group">
                                <label for="owner_address">Owner Address</label>
                                <textarea name="owner_address" id="owner_address" class="form-control" rows="4"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="owner_pass">Create Password</label>
                                <input type="password" class="form-control" id="owner_pass" placeholder="Create a password" />
                            </div>
                            <div class="form-group">
                                <label for="owner_con_pass">Confrim password</label>
                                <input type="password" class="form-control" id="owner_con_pass" placeholder="Confrim password" />
                            </div>
                            <div class="form-group text-center">
                                <button type="submit" class="btn btn-outline-success">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-lg-4 offset-lg-2">
                    <div class="d-flex align-items-center justify-content-center w-100 h-100vh">
                        <div class="owner-login w-100">
                            <form action="#">
                                <h3 class="form-title">Owner Login</h3>
                                <div class="form-group">
                                    <label for="owner_login_email">Email</label>
                                    <input type="email" class="form-control" id="owner_login_email" placeholder="Email or username" />
                                </div>
                                <div class="form-group">
                                    <label for="owner_login_pass">Enter Password</label>
                                    <input type="password" class="form-control" id="owner_login_pass" placeholder="enter your password" />
                                </div>
                                <div class="form-group text-center">
                                    <button type="submit" class="btn btn-outline-success">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- propper js -->
    <script src="{{url('login/js/popper-1.14.6.min.js')}}"></script>

    <!-- bootstrap js -->
    <script src="{{url('login/js/bootstrap-v4.2.1.min.js')}}"></script>

</body>

</html>