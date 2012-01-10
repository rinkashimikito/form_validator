function bindEvent(e, eventName, eventHandler) {
  if (e.addEventListener){
    e.addEventListener(eventName, eventHandler, false); 
  } else if (e.attachEvent){
    e.attachEvent('on'+eventName, eventHandler);
  }
}

// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
function getInternetExplorerVersion()
{
  var rv = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}

function Validator(formId) {
    var obj = this;
    this.formElement = document.getElementById(formId);
    this.validate = function() {
        //need to use that because there are differences between IE event names and other browsers
        bindEvent(document.getElementById('contact-submit'), 'click' ,function(evt){
            if (!evt) evt = window.event;
            //check if preventDefault is supported by browser
            if(evt.preventDefault){  
                evt.preventDefault();  
            }else{  
                evt.returnValue = false;  
                evt.cancelBubble=true;  
            }
            var nameReg, nameError;
            var formElements = obj.formElement;
            
            for( var i = 0; i < formElements.length-1; i++) {
                if (formElements[i].name) {
                    switch(formElements[i].name) {
                        case 'contact-name':
                        nameReg = /^[a-zA-Z]+$/;
                        nameError = "This Field is required. Letters Only";
                        break;
                        case 'contact-email':
                        nameReg = /^(\w+[\-\.])*\w+@(\w+\.)+[A-Za-z]+$/;
                        nameError = "This Field is required. Not Valid Email";
                        break;
                        case 'contact-phone':
                        nameReg = /^[0-9]{0,11}$/;
                        nameError = "Digits Only (max 11)";
                        break;
                    }
                        if(!formElements[i].value.match(nameReg)){                    
                            obj.showError(formElements[i], nameError);
                            formElements[i].focus();
                        } else {
                            obj.removeError(formElements[i].name);  
                        }
                }   
            }
            var errors = obj.formElement.getElementsByTagName('div');
            if (errors.length == 0) obj.formElement.submit();
        });
        
    };
    this.showError = function(elementId, errorMsg){
    //check if elementId error exists
        if (!document.getElementById(elementId.name + '-err')) {
            var errId = elementId.name + '-err';
            var elementWidth = elementId.offsetWidth;
            var leftPos = elementId.offsetLeft + elementWidth + 5 + 'px';
            var topPos = elementId.offsetTop + 'px';
            var browser = getInternetExplorerVersion();
            //different offsetTop/Left handling in IE ver < 8
            if (browser < 8.0 && browser > -1) var topPos = elementId.offsetTop + elementId.parentNode.offsetTop + 'px';
            var errDiv = document.createElement('div');
            this.formElement.appendChild(errDiv);
            errDiv.setAttribute('id',errId);
            errDiv.setAttribute('class','error');
            errDiv.setAttribute('className','error');
            errDiv.innerHTML = errorMsg;
            errDiv.style.left = leftPos;
            errDiv.style.top = topPos;
        }
    };
    this.removeError = function(elementName) { 
        var errDiv = document.getElementById(elementName + '-err'); 
        if (errDiv) {
            this.formElement.removeChild(errDiv);
        }
    }
}

window.onload = function() {
    var actionLink = document.getElementById('hide-news');
    var toBeHidden = document.getElementById('news-list');
    toBeHidden.style.display = 'block';
    
    //simple function for hide/show elements 
    actionLink.onclick = function(e) {
        var evt = e || window.event;
        if(evt.preventDefault){  
            evt.preventDefault();  
        }else{  
            evt.returnValue = false;  
            evt.cancelBubble=true;  
        }
        if (toBeHidden.style.display == 'block') toBeHidden.style.display = 'none';
        else toBeHidden.style.display = 'block';
    }
}