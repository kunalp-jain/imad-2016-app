
var submit=getElementById('submit-btn');
submit.onclick=function()
{
	var request= new XMLHttpRequest();
	request.onreadystatechange= function()
	{
		if(request.readyState== XMLHttpRequest.Done)
		{
			if(request.status==200)
			{
				var names=request.resposeText;
				names=JSON parse(names);
				var ls=' ';
				for(var i=0;i<names.length;i++)
				{
					ls+= '<li>' +names[i]+'</li>';
				}
				var ul=getElementById('namelist');
				ul.innerHTML=ls;
			}
		}
	}
};
var nameinput=getElementById('name');
var name=nameinput.value;
request.open('GET',url+name,true);
request.send(null);
