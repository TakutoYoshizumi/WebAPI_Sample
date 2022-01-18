'use strict';

let btn=document.getElementById('js-btn');
btn.addEventListener('click',function(){
    let postalCode=document.getElementById('postalCode').value; //入力された郵便番号を取得
    let postalParent=document.getElementById('postalCode').parentNode;
    let p=document.createElement('p');
    p.classList.add("error");
    console.log(postalParent);
    //HTMLHttpRequestオブジェクトを生成
    const xhr=new XMLHttpRequest();

    //サーバー通信時の処理を定義する
    xhr.onreadystatechange=function(){
        if(xhr.readyState ===4){//通信が完了した時
            if(xhr.status ===200){//通信が成功した時
                console.log(xhr.responseText);
                let data = JSON.parse(xhr.responseText);
                console.log(data);
                if(data.results == null){
                    console.log("エラー");
                    p.textContent='入力が間違っています';
                    postalParent.appendChild(p);

                }else{
                    document.getElementById("address1").setAttribute('value',data.results[0].address1);
                    document.getElementById("address2").setAttribute('value',data.results[0].address2);
                    document.getElementById("address3").setAttribute('value',data.results[0].address3);
                }
             
            }else{//通信が失敗した時
                p.textContent='リクエスト失敗';
                postalParent.appendChild(p);
            }
            
        }
    }
    //サーバーとの非同期通信を開始
    xhr.open('GET','https://zipcloud.ibsnet.co.jp/api/search?zipcode=' + postalCode,true);
    xhr.send(null);
})
