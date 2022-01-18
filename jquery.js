'use strict';

$("#js-btn").on('click',function(){
    let postalCode = $('#postalCode').val();
    console.log(postalCode);

	$.ajax({
		type : 'GET',
		url : 'https://zipcloud.ibsnet.co.jp/api/search?zipcode=' + postalCode,
		dataType: 'json',
		timeout : 5000
	}).done(function(data){
        console.log(data);
		if(data.results == null){
			$('.postalCode').find('td:last-child').append('<p class="error">入力が間違っています。</p>');
		} else {
			$('#address1').val(data.results[0].address1);
			$('#address2').val(data.results[0].address2);
			$('#address3').val(data.results[0].address3);
		}
	}).fail(function(){
		console.log('リクエスト失敗');
	});
})