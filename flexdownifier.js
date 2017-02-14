var md = require('markdown-it')();
var fa = require('markdown-it-fontawesome');

md.use(fa);
var $ = require('jQuery');
var header =
//FAIRE CHARGER FONT AWESOME SEULEMENT SI BESOIN (DETECTER TAGS)
    '<!DOCTYPE html>\
            <html lang="en">\
            <head>\
                <link rel="stylesheet" href="./css/index.css" type="text/css" />\
                <link rel="stylesheet" href="./css/font-awesome.css" type="text/css" />\
                <meta name="viewport" content="width=device-width, initial-scale=1">\
            </head>\
            <body>'
var footer = "</body>\
            </html>"

            function jqueyVoodoo(ht) {
                /*JQUERY HELPERS*/
                ht.find(".bloc").has(' p img').addClass('imageInside');
                ht.find(".line").has(' .bloc p img').addClass('imageInside');
                ht.find("p").has('img').each(function(index) {
                    console.log($(this).siblings())
                    if ($(this).siblings().length < 1) {
                        $(this).addClass('pimageInside');
                    }
                })
                //AJOUTER DE LA GENERECITE SUR LES TYPES ACCEPTES
                ht.find("img").each(function(index) {
                    console.log($(this).attr('src'))
                    console.log($(this).attr('src').split('.').pop())

                    if ($(this).attr('src').split('.').pop() == "mp4") {
                        $(this).replaceWith("<video controls>\
                                             <source src=" + $(this).attr('src') +
                            " type='video/mp4'>\
                                                Your browser does not support the video tag.\
                                             </video>")
                    }
                })

                ht.find("a").each(function() {
                    //PB AVEC LES ICONES DANS LES LIENS
                    data = md.render($(this).html());
                    while (data.indexOf('&lt') >= 0 || data.indexOf('&gt') >= 0) {
                        data = data.replace('&lt;', '<').replace('&gt;', '>');
                    }
                    console.log(data);
                    $(this).html(data);
                })
                return ht.prop('outerHTML');
            }





                function flexdownify(string) {
                    var returnHTML = ""
                    var reg1 = /[/]{3}[\s]/g;
                    var reg2 = /[\[](10|[0-9])[/](10|[0-9])[/](10|[0-9])[\]]/g;
                    //A MODIFIER POUR LIENS
                    var reg3 = /[\[]((#([a-f0-9]{3}){1,5})|([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)))[\]]/g;

                    var bigGroups = string.split("\n///");
                    var divs = [];
                    bigGroups.forEach(function(v) {
                        var split = v.split(reg3)
                        console.log(split)
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
                            returnHTML += md.render(html);
                            returnHTML += '</div>'
                        }
                        returnHTML += '</div>'
                    });
                    returnHTML = jqueyVoodoo($('<div>' + returnHTML + '</div>'));
                    return header + returnHTML + footer
                }
