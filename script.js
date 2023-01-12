//alert("ok");

$(function(){

    var letterSelect = false;
    var puzzleWords = ["AGO", "GOAL", "ALONG", "LONG", "LOAN"];
    var wordFlags = [true, true, true, true, true];
    var wordLetters = [];


    $("#icon > .material-symbols-outlined").click(function(e){
        shift(e);
    })


    function shuffleDisabled(){ //disable
        $("#icon").css("pointer-events", "none");
    }

    function shuffleEnabled(){ //enable
        $("#icon").css("pointer-events", "auto");
    }


    function shift(e){
        var arrayOfLetters = ["A", "G", "O", "L", "N"];
    
        for(let i=1;i<6;i++){
            var randNum = Math.floor(Math.random() * arrayOfLetters.length);
            $(`#num${i}`).text(`${arrayOfLetters[randNum]}`)
            arrayOfLetters.splice(randNum, 1);
            }
        }


    $("#bulb > .material-symbols-outlined").click(function(){
        $(".unsel").fadeIn(2000).css({color: "black"}).delay(1000).fadeOut(2000,function(){
            $(".unsel").fadeIn(100).css("color", "rgb(246, 177, 250)");
        });
    })

    
    for(let n=1;n<6;n++){
        $(`#shift > #num${n}`).click(function(){

            letterSelect = wordLetters.includes($(this).text());
            shuffleDisabled();

            if(!letterSelect){
                wordLetters.push($(this).text());
                $(this).css("background", "white");
                $("#wordG").append($(this).text());
            }
            
            else{
                $(this).animate({right: "-=10px" , backgroundColor: "rgb(130, 25, 53)"}, 80)
                        .animate({right: "+=10px", backgroundColor: "rgb(130, 25, 53)"}, 100)
                        .animate({right: "-=10px", backgroundColor: "rgb(130, 25, 53)"}, 80)
                        .animate({right: "+=10px", backgroundColor: "rgb(130, 25, 53)"}, 100).animate({backgroundColor: "white"});
            }
        })
    }

  
    $("#game").contextmenu(function(e){
        e.preventDefault() ;
        shuffleEnabled();
        var userWord = wordLetters.join("");
        wordLetters = [];
        
        if(puzzleWords.includes(userWord)){
            var size = wordLetters.length;
           
            for(let n=1;n<6;n++){
                $(`#shift > #num${n}`).css("background", "none");
            }

            for(let i=0;i<puzzleWords.length;i++){
            
                if(userWord == puzzleWords[i]){
               
                    if(wordFlags[i]){
                        $(`.w${i+1}`).animate({backgroundColor: "rgb(50, 19, 69)"}).css("border", "1px solid rgb(50, 19, 69)");

                        $(`.w${i+1} > p`).removeClass("unsel").addClass("sel");
                        wordFlags[i] = false;
                    }

                    else{
                        $(`.w${i+1}`).animate({backgroundColor: "rgb(50, 19, 69)"}, 80)
                                        .animate({backgroundColor: "rgb(130, 25, 53)"}, 100)
                                        .animate({backgroundColor: "rgb(50, 19, 69)"}, 80)
                                        .animate({backgroundColor: "rgb(130, 25, 53)"}, 100)
                                        .animate({backgroundColor: "rgb(50, 19, 69)"}, 80);
                    }
              
                }
            
                $("#wordG").text("").fadeIn(100);
            }
        }
        else{
            $("#wordG").animate({backgroundColor: "rgb(130, 25, 53)"}, 100).animate({backgroundColor: "white"}, 100).animate({backgroundColor: "rgb(130, 25, 53)"}, 100)
            .animate({backgroundColor: "white"}, 100).fadeOut(300, function(){
                     $("#wordG").text("").fadeIn(100).css("backgroundColor", "white");
                 });

            wordLetters = [];
            for(let n=1;n<6;n++){
                $(`#shift > #num${n}`).css("background", "none");
            }
            $("#wordG").css("background", "white");
        }
    
        for(let n=1;n<6;n++){ //adds the clicked letters to the wordLetters array and so it creates the word that the user is entering
            
            $(`#shift > #num${n}`).click(function(){
                letterSelect = wordLetters.includes($(this).text());
                disableShuffle();
                $("#wordG").show();
                if(!letterSelect){
                    wordLetters.push($(this).text());
                    $(this).css("background", "white");
                    $("#wordG").append($(this).text());
                }
            })
        }
    
    })
})

