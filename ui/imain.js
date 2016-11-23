var submit=document.getElementById("randbtn");
        submit.onclick=fucntion()
        { 
          var request= new XMLHttpRequest();
          request.onreadystatechange=function()
          {
          if (request.readyState === XMLHttpRequest.DONE)
          { 
            if(request.status==200)
            {
            submit.value='success';
            }  

            }
        }

var comment=document.getElementById(rand).value;
request.open('POST','/random');
request.setRequestHeader(Content-Type,application/json);
request.send(JSON.stringify(comment));

      }