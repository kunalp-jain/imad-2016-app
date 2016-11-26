
                  loadnav();
                  loadfooter();
              loadCommentForm();

function loadCommentForm () {
  var comment = `  <hr><p class="h3">Give feedback of my work. You need to be logged in to access this feature </p>
  <textarea id="comment_text1" rows="5" cols="100" placeholder="Type here..."></textarea>
  <br>
  <input class="btn btn-primary" type="submit " id="submit" value="Submit" />
  <br>`;
  document.getElementById('comment').innerHTML = comment;

  var submit=document.getElementById('submit');
  submit.onclick=function(){
    var request=new XMLHttpRequest();
    request.onreadystatechange=function()
    {
      if(request.readyState===XMLHttpRequest.DONE)
      {
        if(request.status===200)
        {
          alert('sent successfully');
          submit.value='submit';
        }
        else{
          alert('unsuccessfuly');
        }
      }
    };
    var data= document.getElementById('comment_text1').value;
    request.open('POST','/pcomment',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({data:data}));
    submit.value='submitting...'

  };

}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadCommentForm(this.responseText);
            }
        }
    };

    request.open('GET', '/check-login', true);
    request.send(null);
}
function loadnav(){
  document.getElementById('nav-bar').innerHTML=`
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="/">Blogging</a>
      </div>
      <ul class="nav navbar-nav">
        <li class="active"><a href="/">Home</a></li>
        <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="/ui/Introduction">About me <span class="caret"></span></a>
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
function loadfooter(){
  document.getElementById('foot').innerHTML=`
        <div class="container row-footer ";>
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
            <p class="text-center"> made with <i class="fa fa-heart"> by Ashutosh Soni</i></p>

                    `

                    return;
                  }
