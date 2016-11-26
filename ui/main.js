
function loadLoginForm () {
    var loginHtml = `
        <h2 >Login/Register to write your own article</h2>
        <input class="form-control input-lg" type="text" id="username" placeholder="username" /><br>
        <input  type="password" class="form-control input-lg" id="password" placeholder="password" />
        <br/><br/>
        <input  type="submit" class="btn btn-primary btn-lg btn-block"  id="login_btn" value="Login" /><br>
        <input type="submit" class="btn btn-primary btn-lg btn-block" id="register_btn" value="Register" />
        `;
    document.getElementById('login_area').innerHTML = loginHtml;

    // Submit username/password to login
    var submit = document.getElementById('login_btn');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();

        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  submit.value = 'Sucess!';
              } else if (request.status === 403) {
                  submit.value = 'Invalid credentials. Try again?';
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              } else {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              }
              loadLogin();
          }
          // Not done yet
        };

        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));
        submit.value = 'Logging in...';

    };

    var register = document.getElementById('register_btn');
    register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();

        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  register.value = 'Registered!';
              } else {
                  alert('Could not register the user');
                  register.value = 'Register';
              }
          }
        };

        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));
        register.value = 'Registering...';

    };
}

function loadLoggedInUser (username) {
  document.getElementById('login_area').innerHTML=` `;
    var logout = document.getElementById('logout');
    logout.innerHTML = `
        <h4 class="text-left" > Hi <i>${username}</i></h4>
        <a href="/logout">Logout</a>
    `;
     LoadWriteArticles();
}
function LoadWriteArticles(){
document.getElementById('wr-article').innerHTML=`
  <div class="text-left">
     <h5>Submit an Article</h5>

    <input type="text" id="article_title"  cols="30" placeholder="Enter your title here..."></textarea>
    <br/>
    <input type="text" id="article_heading" cols="30"  placeholder="Enter your heading here..."></textarea>
    <br>
    <input type="text" id="article_date" cols="10"  placeholder="yyyy-mm-dd..."></textarea>
    <br>
    <textarea id="article_content" rows="4" cols="70"  placeholder="Enter your content here..."></textarea>
    <br>
    <br/>
    <input class="btn btn-primary " type="submit" id="submit" value="Submit" />
    <br>
</div>
<br>
    `;
    var submit =document.getElementById('submit');
    submit.onclick= function(){
var request= new XMLHttpRequest();
request.onreadystatechange=function(){
if(request.readyState===XMLHttpRequest.DONE)
{
    if(request.status===200)
    {
      alert('Article submitted!');
      submit.value='submited';
    }
    else{
      alert('could not submit articles');
    }
};

}
var title=document.getElementById('article_title').value;
var heading=document.getElementById('article_heading').value;
var content=document.getElementById('article_content').value;
var date=document.getElementById('article_date').value;
request.open('POST','/submit-article');
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({title:title,heading:heading,content:content,date:date}));
submit.value='submitting wait...'
  };

  return;
}
function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                loadLoginForm();
            }
        }
    };

    request.open('GET', '/check-login', true);
    request.send(null);
}

function loadArticles () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('articles');
            if (request.status === 200) {
                var content = '<ul>';
                var articleData = JSON.parse(this.responseText);
                for (var i=0; i< articleData.length; i++) {
                    content += `<li>
                    <a href="/articles/${articleData[i].title}">${articleData[i].heading}</a>
                    (${articleData[i].date.split('T')[0]})</li>`;
                }
                content += "</ul>"
                articles.innerHTML = content;
            } else {
                articles.innerHTML('Oops! Could not load all articles!')
            }
        }
    };

    request.open('GET', '/get-articles', true);
    request.send(null);
}


// The first thing to do is to check if the user is logged in!

function loadnav(){
  document.getElementById('nav-bar').innerHTML=`
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="/">Blogging</a>
      </div>
      <ul class="nav navbar-nav">
        <li class="active"><a href="/">Home</a></li>
        <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="/Introduction">About me <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="/introduction">profile</a></li>
            </ul>
        </li>
      </ul>
    </div>
  </nav>
`
return;
}
function loadrules()
{
  document.getElementById('rules').innerHTML=`<ol class="pull-left">

    <li> You can write articles and get recognized.</li>
    <li> You can not have the same title if another user has that title</li>
    <li> Your articles can be read by friends if they register on this site </li>
    <li> Articles You write can be seen by anyone.</li>
        </ol>

  `
  return;
}

function loadfooter(){
  document.getElementById('foot').innerHTML=`
        <div class="row-footer ";>
            <div class="row row-footer">
	        <div class="col-xs-5 col-xs-offset-1 col-sm-2 col-sm-offset-1">
                    <h5>Links</h5>
                    <ul class="list-unstyled">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="/Introduction">About me</li>

                        <li><a href="index.html#">Contact</a></li>
                    </ul>
                </div>
	        <div class="col-xs-6 col-sm-5">
                    <h5>I live in Chennai </h5>
                    <i class="fa fa-phone"></i> 9840523023<br>
                    <i class="fa fa-envelope"></i>m.ashutoshsoni@gmail.com
                    </address>
                    </div>
                    <div class="col-xs-12 col-sm-4">
                    <div class="nav navbar-nav">
                    <a href="https://www.facebook.com/narutosh.uzuoni"><i id="social-fb" class="fa fa-facebook-square fa-3x social"></i></a>
                    <a href="https://twitter.com/ashutoshsoni16"><i id="social-tw" class="fa fa-twitter-square fa-3x social"></i></a>               </div>
                    <div class="col-xs-12">

                    </div>

                    </div>


                    </div>
  <p> made with<div class="fa fa-heart">by Ashutosh Soni</div></p>

                    
                    `

                    return;
                  }

loadnav();

loadfooter();

loadrules();


loadLogin();

// Now this is something that we could have directly done on the server-side using templating too!
loadArticles();
