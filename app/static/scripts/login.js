$(function(){
	Backbone.emulateJSON = true; 
	$("._vr_login").on("click",function(event){
		login()
	})
	function login(){
		var loginText = $("._vr_login").text();
		if($("#password").val()==""){
			alert("请正确输入用户名和密码")
			return false;
		}else if($("#username").val()==""){
			alert("请正确输入用户名和密码")
		}else{
		    if (loginText == "") {
		        $("._vr_login").css("pointer-events", "none");
		    } else {
		        $("._vr_login").text("登录中")/*.css("pointer-events", "none");*/
		    }
			var loginModel = Backbone.Model.extend({
				parse: function (resp, xhr) {
	                return resp.data.data;
	            },
				defaults: {
		            password:'',
		            username:''
		        }
			});
			var newModel = new loginModel();
			newModel.set("password",$("#password").val())
			newModel.set("username",$("#username").val())
			newModel.save(null,{
				url: RootUrl+"/?d=api&c=user&m=login",
				error:function (model, xhr){
		           alert(message.common.server.error)
		           $("._vr_login").text("登录");
		        },
		        success:function (model, xhr){
		        	if(xhr.status==1){
		        		dropdownOpen()
		        		$("._vr_unLogin").hide();
		        		$("._vr_loginSuccess").show();
		        		setCookie("ci_session",xhr.data.user.session_id,30)
		        		setCookie("username",xhr.data.user.username)
		        		setCookie("uid",xhr.data.user.id)
		        		window.location.reload()
		        	}else{
		        		$(".loginpob").find("dd").html(xhr.data.msg)
		        		$(".loginpob").find("dt").addClass("failed")
		        		$(".loginpob").show();
		        		$(".mask").show()
		        		$(".loginsure").on("click",function(){
		        			$(".loginpob").hide();
		        			$(".mask").hide();
		        			$("._vr_login").text("登录");
		        		})
		        		$(".close").on("click",function(){
		        			$(".loginpob").hide();
		        			$(".mask").hide();
		        			$("._vr_login").text("登录");
		        		})
		        	}
		        	// setCookie()  
		        },
			})
		}
	}
	$(".logOut").on("click",function(){
		var goOutModel = Backbone.Model.extend();
		var NewOutModel = new goOutModel;
		NewOutModel.fetch({
		
			url:RootUrl+"/?d=api&c=user&m=logout",
			success:function(model,xhr){
				clearCookie("ci_session")
				clearCookie("username")
				goHome()
			},
			error:function(model,xhr){

			}
		})
		
	})
	var userLogin = getCookie("ci_session")
	var USERNAME = getCookie("username")
	$("._vr_nickname").html(USERNAME)
	if(userLogin){
		$("._vr_unLogin").hide();
		$("._vr_loginSuccess").show();
	}else{
		$("._vr_unLogin").show();
		$("._vr_loginSuccess").hide();
		clearCookie("username")
	}
	//找回密码

	$(".noSee").click(function(){
		getCaptcha()
	})
	function getCaptcha(){
		var captchaModel = Backbone.Model.extend();
		var newCaptcha = new captchaModel();
		newCaptcha.fetch({
			url: RootUrl+"/?d=api&c=captcha&m=index",
			error:function (model, xhr){
	        },
	        success:function (model, xhr){
	        	$("#verificationCode").find("img").attr("src","http://"+xhr.data.captcha.img)
	        }
		})
	}
	$(".close").on("click",function(){
		$(".findpassword").hide();
		$(".success").hide();
		$(".accountNumber").hide();
		$(".mask").hide();
	})
	var uid = 0
	$(".form1").find(".nextstep").on("click",function(){
		$(".findpassword").find(".error").html("")
		if($("#findUsername").val()==""){
			$(".findusername").find(".error").html("请输入用户名")
		}else if($("#findCode").val()==""){
			$(".findcode").find(".error").html("验证码不能为空")
		}else{
			var Findpassword = Backbone.Model.extend()
			var NewFindpassword = new Findpassword({
				username:$("#findUsername").val(),
				captcha:$("#findCode").val()
			});
			NewFindpassword.save(null,{
				url:RootUrl+"/?d=api&c=user&m=findpassword",
				
				error:function(){
					console.log("找回密码第一步请求失败")
				},
				success:function(model,xhr){
					console.log(xhr.status)
					if(xhr.status==1){
						$(".form1").hide();
						$(".form2").show();
						$(".stepbg").addClass("step1");
						uid = xhr.data.uid
						var GetfindType = Backbone.Model.extend();
						var NewTypeModel = new GetfindType;
						NewTypeModel.fetch({
							url:RootUrl+"/?d=api&c=user&m=findpasswordway&uid="+uid,
							error:function(){
								console.log("获取找回方式失败")
							},
							success:function(model,xhr){
								if(xhr.status==0){
									$(".findcode").find(".error").html(xhr.data.msg)
								}else{
									if(xhr.data.question==1){
										$(".questionType").show()
									}else{
										$(".questionType").remove()
									}
									if(xhr.data.securitycode==1){
										$(".securitycode").show()
									}else{
										$(".securitycode").remove()
									}
									if(xhr.data.email==1){
										$(".emailType").show()
									}else{
										$(".emailType").remove()
									}
									$(".chooseType").find("li").first().addClass("activeType")

									function getQusetionlist(){
										var QusetionModel = Backbone.Model.extend()
									    var QusetionCollection = Backbone.Collection.extend({
									        model: QusetionModel,
									        parse: function (resp, xhr) {
									            return resp.data.question;
									        }
									    });
									    var NewQusetionCollection = new QusetionCollection;
									    var QusetionView = Backbone.View.extend({
									            el: $("#questionName"),
									            template: _.template($('#question').html()),
									            events: {
									               // "click option":function(event){
									               // 	}
									            },
									            initialize: function () {
									                var template = this.template;
									                var el = this.el;
									                var render = this.render();
									                NewQusetionCollection.fetch({
									                    url: RootUrl+"/?d=api&c=userquestion&m=getlists",
									                    error:function(collection,xhr){
									                        console.log("请求安全问题失败")
									                    },
									                    success: function (collection, xhr) {
									                       console.log(xhr.data.msg)
									                       $(el).html(template({data:collection.models}));
									                    },
									                    silent: true,
									                });
									            } 
									    })
									    var NewQusetionView = new QusetionView;
									}
									$(".chooseType").find("li").on("click",function(){
										$(this).addClass("activeType").siblings().removeClass("activeType")
									})
									$(".form2").find(".nextstep").on("click",function(){
										$(".form2").hide()
										$(".form3").show()
										if($(".questionType").hasClass("activeType")){
											$(".questionBox").show()
											$(".securitycodeBox").hide()
											$(".emailBox").hide()
											getQusetionlist()
										}else if($(".securitycode").hasClass("activeType")){
											$(".securitycodeBox").show()
											$(".questionBox").hide()
											$(".emailBox").hide()
										}else if($(".emailType").hasClass("activeType")){
											$(".emailBox").show()
											$(".securitycodeBox").hide()
											$(".questionBox").hide()
										}else if($(".kefu").hasClass("activeType")){
											$(".findpassword").hide()
											$(".mask").hide()
											window.location.reload()
										}
									})
			    					var wait=0;
			    					getCode()
									function getCode(wait){
										$("#getCode").on("click",function(){
											_this = $(this);
											var GetEmailModel = Backbone.Model.extend();
											var NewGetEmailModel = new GetEmailModel({
												email:$("#emailaddr").val()
											});
											NewGetEmailModel.save(null,{
												type:"POST", 
												url:RootUrl+"/?d=api&c=user&m=sendemailcaptcha&uid="+uid,
												error:function(){
													console.log("获取邮箱验证码失败")
												},
												success:function(model,xhr){
													if(xhr.status==1){
														$(".emailTips").css("background","#dbf7e9").html(xhr.data.msg)
														wait=5
														repule()
														function repule(){
															var timer = setInterval(function(){
															    wait--
															    _this.addClass("disabled")
											            		_this.html("重新发送("+wait+")")
											            		console.log(_this.html())
											            		_this.unbind("click")
											            		if(wait==0){
											            			clearTimeout(timer)
											            			_this.bind("click",getCode())
											            			_this.html("获取验证码").removeClass("disabled")
											            		}
															},1000)
															
									            		}
													}else{
														$(".emailTips").css({"background":"#f37e94","color":"#520211"}).html(xhr.data.msg)
													}
												}
											})
										})
									}
									$(".securitycodeBox").find(".nextstep").on("click",function(){
										var saveSecurity = Backbone.Model.extend()
										var newsaveSecurity = new saveSecurity({
											securitycode:$("#securitycode").val(),
										})
										newsaveSecurity.save(null,{
											url:RootUrl+"/?d=api&c=user&m=checksc&uid="+uid,
											error:function(model,xhr){
											},
											success:function(model,xhr){
												if(xhr.status==1){
													$(".form3").hide();
													$(".form4").show();
													$(".stepbg").addClass("step2").removeClass("step1");
												}else{
													$(".securitycodeBox").find(".err").show().html(xhr.data.msg)
												}
											}
										})
									})
									$(".emailBox").find(".nextstep").on("click",function(){
										var saveEmail = Backbone.Model.extend()
										var newSaveEmail = new saveEmail({
											email:$("#emailaddr").val(),
											captcha:$("#emailCode").val()
										})
										newSaveEmail.save(null,{
											url:RootUrl+"/?d=api&c=user&m=checkemailcode&uid="+uid,
											error:function(model,xhr){
												console.log("验证邮箱接口请求失败")
											},
											success:function(model,xhr){
												if(xhr.status==1){
													$(".form3").hide();
													$(".form4").show();
													$(".stepbg").addClass("step2").removeClass("step1");
												}else{
													$(".emailBox").find(".err").show().html(xhr.data.msg)
												}
											}
										})
									})
									$(".questionBox").find(".nextstep").on("click",function(){
										var saveQuestion = Backbone.Model.extend();
										var NewSavequestion = new saveQuestion({
											qid:$("#questionName").find("option:selected").attr("data-data"),
											answer:$("#answer").val()
										});
										NewSavequestion.save(null,{
											type:'POST',
											url:RootUrl+"/?d=api&c=userquestion&m=checkanswer&uid="+uid,
											error:function(model,xhr){
												console.log("保存问题失败")
											},
											success:function(model,xhr){
												if(xhr.status==1){
													$(".form3").hide();
													$(".form4").show();
													$(".stepbg").addClass("step2").removeClass("step1");
												}else{
													$(".questionBox").find(".err").show().html(xhr.data.msg)
												}
											}
										})
									})
									$(".form4").find(".nextstep").on("click",function(){
										var Setpassword = Backbone.Model.extend()
										var Nsetpassword = new Setpassword({
											password:$("#setNeword").val(),
											password_check:$("#prosetNeword").val()
										})
										Nsetpassword.save(null,{
											url:RootUrl+"/?d=api&c=user&m=changeloginpassword&uid="+uid,
											error:function(){},
											success:function(model,xhr){
												if(xhr.status==1){
													$(".form4").hide();
													$(".form5").show();
													$(".form5").find("dd").html(xhr.data.msg)
													$(".stepbg").addClass("step3").removeClass("step2");
												}
											}
										})
									})
								}
							}
						})
					}else{
						$(".findcode").find(".error").html(xhr.data.msg)
					}
				}
			})
		}
	})
	$(".prestep").click(function(){
		console.log("上一步")
		$(".form3").hide();
		$(".form2").show();
	})
	$(".forgetPwd").on("click",function(){
		getCaptcha()
		$(".findpassword").show();
		$(".mask").show();
	})
	$(".loginsure").on("click",function(){
		$(".mask").hide();
		$(".success").hide()
	})
	$(".closepob").on("click",function(){
		$(".findpassword").hide()
		$(".mask").hide();
	})

	var getCookies = getCookie("ci_session")
	
	setCookie("ci_session",getCookies,30)

	$("#password").keydown(function(e){
        keynum = window.event ? e.keyCode : e.which;
        if(keynum==13){
            login()
        }
    })

})	


