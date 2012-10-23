var _startX = 0;            // mouse starting positions
var _startY = 0;
var _offsetX = 0;           // current element offset
var _offsetY = 0;
var _dragElement;           // needs to be passed from OnMouseDown to OnMouseMove
var _oldZIndex = 0;         // we temporarily increase the z-index during drag
var wsp;
var mwspx;
var mwspy;
var Mwspx;
var Mwspy;

var _Left;
var _Top;

$(document).ready(function(){
		wsp = document.getElementById("wsp1");
		$("#colorPicker").ColorPicker(
				{
					onChange:function(){
						var color = document.getElementsByClassName("colorpicker_new_color")[0].style.backgroundColor;
						$("#colorPicker").css("background-color",color);
						$("#preview").css("color",color);
					}
				}
		);
		
		$(function() {
			$( "#radio" ).buttonset();
			$(".tpanel").draggable();
		});
		
		$("#wsp1").droppable({
         accept: ".PFrame",
         drop: function(event,ui){
                        	var newItem = $(ui.draggable).clone();
                        	if(newItem.attr("id") == "PFrameO"){
                               $(this).append(newItem);
                                newItem.attr("id","PFrame"+wsp.children.length);
                                newItem.children().attr("id",newItem.children().attr("id")+wsp.children.length);
                                newItem.children().attr("ondblclick","resize(this.id)");
                                newItem.css("margin-right","0px");
                                newItem.css("left",event.clientX + "px");
                                newItem.css("top", ((event.clientY - 50)) + 'px');
                        		newItem.children().attr("title",newItem.children().attr("id"));        
                        		$("#"+newItem.children().attr("id")).tooltip({effect:'slide'});
                        		$("#"+newItem.attr("id")).draggable({ containment:"#wsp1"});
                        		$("#"+newItem.attr("id")).bind("contextmenu",function(event)
                        		{
                        			$("#subMenu").attr("class",newItem.attr("id"));
                        			$("#subMenu").slideDown();
                        			$("#subMenu").css("left",event.clientX);
                        			$("#subMenu").css("top",event.clientY);
                        			$('body').click(
                        	        		function(){
                        	        			$('#subMenu').slideUp(
                        	        					function(){
                        	        						$('body').click = null;
                        	        					}
                        	        			);
                        	        		}
                        	        );
                        			$('#subMenu').click(function() {
                        		        $('#subMenu').slideUp();
                        		    });
                        			$("#"+newItem.attr("id")).click(function() {
                        		        $('#subMenu').slideUp();
                        		    });
                        			return false;
                        		});
                        	}  
                        }
                });
				
			  	$(".arrow").click(function(){
			  	 $(".mems_bar").animate({width:"toggle"});
			  		 var worksp = document.getElementById("wsp1");
			  		 if(worksp.style.marginLeft === "250px" )
			  		 {
			  			$(".workspace").animate({marginLeft:"400px"});
			  		 }
			  		 else
			  			$(".workspace").animate({marginLeft:"250px"});
			  		 
			  	});
			  	$(".PFrameO").draggable({helper:'clone'});
});
			function toggle(id_name,sid)
			{
				var li = document.getElementById(id_name);
				var sli= document.getElementById(sid);
				if(li.style.listStyle == "circle outside none")
				{
					li.style.listStyle = "";
					sli.style.listStyle= "circle outside none";
				}
				else
				{
					li.style.listStyle = "circle outside none";
					sli.style.listStyle = "";
				}
				
			}
			function resize(id)
			{
				
				var elem = document.getElementById(id);
				elem.parentNode.style.borderStyle="solid";
				elem.style.cursor ="se-resize";
				$(elem).parent().draggable("disable");
				var oldOnMouseUp = document.onmouseup; 
				var oldOnMouseDown = document.onmousedown;
				var oldOnMouseMove = document.onmousemove;
				var oldOnDragstart = document.ondragstart;
				document.ondragstart = function(){return false};
				document.onmousedown=function(e){
					if(e.target.id == id){
						_startx =  e.clientX;
						_starty = e.clientY;
						_offsetx =e.target.width;
						_offsety = e.target.height;
						document.onmousemove=function(e){
					        elem.style.opacity = "0.5";
							$(elem).width(e.clientX - _startx + _offsetx +"px");
							$(elem).height(e.clientY - _starty +_offsety+"px");
							$(elem).parent().width(e.clientX - _startx + _offsetx+"px");
							$(elem).parent().height(e.clientY - _starty  + _offsety+"px");
						}
					}
				};
				document.onmouseup=function(e)
				{
					elem.parentNode.style.borderStyle="none";
					elem.style.cursor = "";
					elem.style.opacity = "1";
					$(elem).parent().draggable("enable");
					document.onmousemove = oldOnMouseMove;
					document.onmousedown = oldOnMouseDown;
					document.onmouseup = oldOnMouseUp;
					document.ondragstart = oldOnDragstart;
				}
			}
			function resizewsp()
			{
				$(function(){
					$(wsp).resizable({
						containment: "body"
					});
					$(".ui-resizable-handle").css("display","block");
					$(wsp).resizable("enable");
					var oldOnMouseUp = document.onmouseup;
					document.onmouseup = function(e){
						$(wsp).resizable("disable");
						$(".ui-resizable-handle").css("display","none");
						$("label").removeClass("ui-state-active");
						document.onmouseup = oldOnMouseUp;
					}
				}
				);
			}
			function toImage()
			{
				$(wsp).html2canvas();
				$("#overlay").overlay();
			}
    function load_image()
			{
				var can = document.getElementsByTagName("canvas")[0];
				$("#fresault").attr("src",can.toDataURL("image/jpeg"));
				$("#fresault").css("width",can.width);
				$("#fresault").css("height",can.height);
				$("#fresault").css("margin","auto");
				$("#fresault").css("opacity","1");
				document.body.removeChild(can);
				$("label").removeClass("ui-state-active");
			}
	function changef(type)
	{
		if (type == "size")
		{
			$("#preview").css("font-size",$("#font").val());
		}
		else if (type == "style")
		{
			$("#preview").css("font-style",$("#style").val());
		}
		else if (type = 'text')
		{
			$("#preview").text($(".text").val());
		}
	}
	function addText()
	{
		var newItem =  $('#preview').clone();
		newItem.attr("id",newItem.attr("id")+wsp.children.length);
		newItem.addClass("Text");
		$(wsp).append(newItem,$(newItem).draggable({ containment:'#wsp1'}));
		$('.tpanel').fadeOut(function(){$('label').removeClass('ui-state-active')})
	}
	function saveImage()
	{
		var img = document.getElementById('fresault');
		window.location.href = img.src.replace('image/jpeg', 'image/octet-stream');
	}
	function remove(id)
	{
		var oldChild = document.getElementById(id);
		wsp.removeChild(oldChild);
	}
	function toFront(id)
	{
		$('#'+id).css("z-index",ExtractNumber($('#'+id).css("z-index"))+1);
	}
	function toBack(id)
	{
		$('#'+id).css("z-index",ExtractNumber($('#'+id).css("z-index"))-1);
	}
	function addImage(){
		var div = document.createElement("div");
		div.className="PFrame";
		div.id="PFrame"+wsp.children.length;
		img = document.createElement("img");
		var type = document.getElementById("fileAdder").files[0].type;
		if(type.search("image") == 0 )
		{
			var reader = new FileReader();

            reader.onload = function (e) {
                $(img).attr('src', e.target.result);
            }
           reader.readAsDataURL(document.getElementById("fileAdder").files[0]);
           img.id = "usrImage"+wsp.children.length;

		}
		else
			{
				alert("wrong file type");
				return false;
			}
		div.appendChild(img);
		var newItem = $(div);
		$(wsp).append(newItem);
		newItem.children().attr("ondblclick","resize(this.id)");
		newItem.css("left","400px");
        newItem.css("top","50px");
		newItem.children().attr("title",newItem.children().attr("id"));        
		$("#"+newItem.children().attr("id")).tooltip({effect:'slide'});
		$("#"+newItem.attr("id")).draggable({ containment:"#wsp1"});
		$("#"+newItem.attr("id")).bind("contextmenu",function(event)
		{
			$("#subMenu").attr("class",newItem.attr("id"));
			$("#subMenu").slideDown();
			$("#subMenu").css("left",event.clientX);
			$("#subMenu").css("top",event.clientY);
			$('body').click(
	        		function(){
	        			$('#subMenu').slideUp(
	        					function(){
	        						$('body').click = null;
	        					}
	        			);
	        		}
	        );
			$('#subMenu').click(function() {
		        $('#subMenu').slideUp();
		        
		    });
			$("#"+newItem.attr("id")).click(function() {
		        $('#subMenu').slideUp();
		    });
			return false;
		});
		$('#overlay1').fadeOut();
		$("label").removeClass("ui-state-active");
	}
	function fixleft(){
		for(var i = 0 ; i < wsp.children.length;i++){
			if(wsp.style.marginLeft === "250px" )
	  		 {
	  			$($(wsp).children()[i]).animate({left:ExtractNumber($($(wsp).children()[i]).css("left").split('px')[0]) + 150});
	  		 }
	  		 else{
	  			$($(wsp).children()[i]).animate({left:ExtractNumber($($(wsp).children()[i]).css("left").split('px')[0]) - 150});
	  			
	  		 }
		}
	}
	function makeBackground(id)
	{
		$(wsp).css("background-image","url('"+$($('#'+id).children()[0]).attr("src")+"')");
		$("#"+id).remove();
	}
	function makewatermark(id)
	{
		$(wsp).css("background-image","url('"+$($('#'+id).children()[0]).attr("src")+"')");
		$("#"+id).remove();
	}
	function rotate (id)
	{
		$("#"+id).mousemove(function(event){
			$("#"+id).css("-moz-transform","rotate("+event+"deg)")
		});
	}
	function ExtractNumber(value)
	{
	    var n = parseInt(value);
	    return n == null || isNaN(n) ? 0 : n;
	}

	// this is simply a shortcut for the eyes and fingers
	function gid(id)
	{
	    return document.getElementById(id);
	}