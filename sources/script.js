
function jqueyVoodoo(ht) {
    /*JQUERY HELPERS*/
    ht.find(".bloc").has(' p img').addClass('imageInside');
    ht.find(".line").has(' .bloc p img').addClass('imageInside');
    ht.find("p").has('img').each(function(index) {
        if ($(this).siblings().length < 1) {
            $(this).addClass('pimageInside');
        }
    })
    //AJOUTER DE LA GENERECITE SUR LES TYPES ACCEPTES
    ht.find("img").each(function(index) {
        if ($(this).attr('src').split('.').pop() == "mp4") {
            $(this).replaceWith("<video controls>\
                                 <source src=" + $(this).attr('src') +
                " type='video/mp4'>\
                                    Your browser does not support the video tag.\
                                 </video>")
        }
    })

    return ht.prop('outerHTML');
}

function flexdownify(string) {                    
    var converter = new showdown.Converter({
        emoji: true,
        underline: true,
    })
    converter.setFlavor('github')
    converter.addExtension(function () {
        return [{
            type: 'output',
            regex: /<a\shref[^>]+>/g,
            replace : function (text) {
                var url = text.match(/"(.*?)"/)[1]
                if(url.includes(window.location.hostname) || url[0] == '/' || url[0] == '.' || url[0] == '#'){
                    return text
                }
                return '<a href="' + url + '" target="_blank">'
            }
        }]
    }, 'externalLink')


    
    
    var returnHTML = ""
    var reg1 = /[/]{3}[\s]/g;
    var reg2 = /[\[](10|[0-9])[/](10|[0-9])[/](10|[0-9])[\]]/g;
    //A MODIFIER POUR LIENS
    var reg3 = /[\[]((#([a-f0-9]{3}){1,5})|([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)))[\]]/g;

    var bigGroups = string.split("\n///");
    var divs = [];
    bigGroups.forEach(function(v) {
        var split = v.split(reg3)
        if (split.length > 1) {

            if (split[1].indexOf("#") > -1) {
                style = "style='background-color:" + split[1] + "; '"
            } else {
                style = "style='background-image: url(http://" + split[1] + ");     margin: 10px;'"
            }
            returnHTML += '<div class="line"' + style + '>'
        } else {
            returnHTML += '<div class="line">'
        }
        var results = split[split.length - 1].split(reg2);
        results.splice(0, 1);
        for (var i = 0; i < results.length; i += 4) {
            html = results[i + 3]
            var style = ""
            returnHTML += '<div ' + style + 'class="bloc B' + results[i] + ' M' + results[i + 1] + ' S' + results[i + 2] + '">'
            returnHTML +=  converter.makeHtml(html)
            returnHTML += '</div>'
        }
        returnHTML += '</div>'
    });
    returnHTML = jqueyVoodoo($('<div>' + returnHTML + '</div>'));
    return returnHTML 
}

document.addEventListener("DOMContentLoaded", function() {
    // Viewport
    var viewportMeta = document.createElement('meta')
    viewportMeta.setAttribute('name', 'viewport')
    viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1, shrink-to-fit=no')
    document.getElementsByTagName('head')[0].appendChild(viewportMeta)
    var meta = document.createElement('meta')
    meta.setAttribute('charset', 'UTF-8')
    document.getElementsByTagName('head')[0].appendChild(meta)
    var markdown = document.querySelector('noscript').innerText
    html=flexdownify(markdown)
    document.body.innerHTML = html
    document.title = document.title ||  document.body.firstElementChild.innerText.trim().split("\n")[0]
    // Handle hash linking
    setTimeout(function() {
        var hash = window.location.hash
        window.location.hash = ''
        window.location.hash = hash
    }, 100)
})
