

function cookieJar(){
    let cookies = 10; 


    return function(){
        if(cookies>0){
            cookies--;
            console.log("you eat one cooikie, cookies left: " + cookies);

        }
        else{
            console.log("no cookies left");
        }
    }
}

let eatCookie = cookieJar();

eatCookie();
eatCookie();
eatCookie();
eatCookie();
eatCookie();

cookies--;
eatCookie();
console.log("cookies left: " + cookies); 




