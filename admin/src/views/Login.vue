<template>
	<div class="registered">
		<!-- 左下角圆 -->
		<div class="left_round"></div>
		<!-- 右上角三角形 -->
		<div class="left_triangle"></div>
		<!-- 主体内容 -->
		<div class="con">
			<!-- 左边登陆部分 -->
			<div class="con_left">
				<div class="con_left-logo"></div>
				<div class="con_left-main">
					<p>欢迎回来</p>
					<div class="connact">
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#iconweixin"></use>
						</svg>
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#iconweixin"></use>
						</svg>
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#iconweixin"></use>
						</svg>
					</div>
					<p>或者使用您的用户名进行登陆</p>
					<!-- 用户名 -->
					<div class="item">
						<div class="item_name">
							<svg class="icon tip" aria-hidden="true">
								<use xlink:href="#iconnavicon-grkh"></use>
							</svg>
							<input type="text" placeholder="用户名" v-model="username" @blur="blur_username">
						</div>
					</div>
					<!-- 密码 -->
					<div class="item">
						<div class="item_password">
							<svg class="icon tip" aria-hidden="true">
								<use xlink:href="#iconmima"></use>
							</svg>
							<input type="password" placeholder="密码" v-model="password" @blur="blur_password">
						</div>
					</div>
					<div class="item">
						<button @click="getData()">登陆</button>
					</div>
				</div>
			</div>
			<!-- 右边注册部分 -->
			<div class="con_right">
				<div class="con_right-square"></div>
				<div class="con_right-rect"></div>
				<div class="con_right-triangle"></div>
				<div class="con_right-main">
					<p>欢迎注册</p>
					<p>注册一个账号</p>
					<p>加入我们的旅行吧</p>
					<div>
						<router-link to="/reg">
							<button>注册</button>
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
const encrypt = require('../../unit/crypto')
export default {
	name: 'login',
	data() {
		return {
			username: '',
			password: ''
		}
	},
	methods: {
		//  用户名框失去焦点
		blur_username() {
			if(!this.username){
				this.$message({
					message: '宝贝 请输入用户名哦',
					type: 'warning'
				})
			}
		},
		//  密码框失去焦点
		blur_password() {
			if(!this.password){
				this.$message({
					message: '宝贝 请输入用密码哦',
					type: 'warning'
				})
			}
		},
		async getData() {
			let user = {}
			user.username = this.username
			user.password = encrypt(this.password)

			if( this.username && this.password ) {
				const res = await this.request.api_post_login(user)

				this.username = ''
				this.password = ''
				
				const status = res.data.status
				const message = res.data.msg
				const data = res.data.data
				if(status == 1) {
					//  存储 token 到 vuex
					this.$store.commit('save', {  
						_id: data._id,
						username: data.username,
						token: data.token,
						avater: data.avater                                                                   
					})
					this.$router.push('/admin')
				}else{
					this.$message({
						message,
						type: 'warning'
					})
				}
			}
		}
	}
}
</script>

<style lang="less" scoped>
.registered{
	width: 100%;
	height: 100%;
	background: #eff3f2;
	position: relative;
	overflow: hidden;
	.left_round{
		position: absolute;
		left: -150px;
		bottom: -100px;
		width: 300px;
		height: 300px;
		background: #facb42;
		border-radius: 50%;
	}
	.left_triangle{
		position: absolute;
		right: -80px;
		top: 4%;
		width:0;
		height:0;
		border-top:75px solid transparent;
		border-bottom:340px solid transparent;
		border-right:600px solid #e35e6a;
		transform:rotate(-22deg);
		-ms-transform:rotate(-22deg); 	/* IE 9 */
		-moz-transform:rotate(-22deg); 	/* Firefox */
		-webkit-transform:rotate(-22deg); /* Safari 和 Chrome */
		-o-transform:rotate(-22deg); 	/* Opera */
	}
	.con{
		width: calc(100% - 40px);
		height: calc(100% - 120px);
		position: absolute;
		top: 60px;
		left: 20px;
		background: skyblue;
		border-radius: 10px;
		display: flex;
		.con_left{
			width: 60%;
			height: 100%;
			background: #fff;
			border-radius: 10px 0 0 10px;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
			.con_left-logo{
				position: absolute;
				left: 20px;
				top: 20px;
				width: 90px;
				height: 40px;
				background: url('../../static/registered/logo.png') no-repeat;
			}
			.con_left-main{
				width: 100%;
				height: 80%;
				text-align: center;
				> p{
					color: #3aaf9f;
					line-height: 40px;
					&:nth-child(1){
						font-size: 40px;
						line-height: 60px;
						margin-top: 65px;
					}
				}
				.item{
					width: 100%;
					text-align: center;
					margin-bottom: 20px;
					> div{
						width: 45%;
						position: relative;
						margin: 0 auto;
						> input{
							width: 100%;
							height: 40px;
							border: none;
							border-radius: 10px;
							background: #eff3f2;
							text-indent: 3rem;
						}
						.tip{
							position: absolute;
							left: 10px;
							top: 8px;
							width: 1.5rem;
							height: 1.5rem;
						}
					}
					> button{
						width: 35%;
						height: 40px;
						color: #fff;
						line-height: 40px;
						background: #71d6b9;
						border: none;
						border-radius: 25px;
						cursor: pointer;
					}

				}
				.connact{
					width: 100%;
					height: 100px;
					line-height: 100px;
					margin: 0;
					.icon{
						width: 2.5rem;
						height: 2.5rem;
						&:nth-child(2){
							padding: 0 20px;
						}
					}
				}
			}
		}
		.con_right{
			width: 40%;
			height: 100%;
			background: -webkit-linear-gradient(#3bb19f, #51c9a5); /* Safari 5.1 - 6.0 */
			background: -o-linear-gradient(#3bb19f, #51c9a5); /* Opera 11.1 - 12.0 */
			background: -moz-linear-gradient(#3bb19f, #51c9a5); /* Firefox 3.6 - 15 */
			background: linear-gradient(#3bb19f, #51c9a5); /* 标准的语法 */
			border-radius: 0 10px 10px 0;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			overflow: hidden;
			.con_right-square{
				position: absolute;
				right: 10px;
				top: 41%;
				width: 45px;
				height: 45px;
				background: #5dc8bf;
				transform:rotate(36deg);
				-ms-transform:rotate(36deg); 	/* IE 9 */
				-moz-transform:rotate(36deg); 	/* Firefox */
				-webkit-transform:rotate(36deg); /* Safari 和 Chrome */
				-o-transform:rotate(36deg); 	/* Opera */
			}
			.con_right-rect{
				position: absolute;
				left: 145px;
				top: 37%;
				width: 50px;
				height: 20px;
				background: rgba(87,201,188,0.8);
				transform:rotate(28deg);
				-ms-transform:rotate(28deg); 	/* IE 9 */
				-moz-transform:rotate(28deg); 	/* Firefox */
				-webkit-transform:rotate(28deg); /* Safari 和 Chrome */
				-o-transform:rotate(28deg); 	/* Opera */
			}
			.con_right-triangle{
				position: absolute;
				right: 180px;
				bottom: -12px;
				width:0;
				height:0;
				border-top:70px solid transparent;
				border-bottom:70px solid transparent;
				border-right:140px solid rgba(90,207,179,0.8);
				transform:rotate(-100deg);
				-ms-transform:rotate(-100deg); 	/* IE 9 */
				-moz-transform:rotate(-100deg); 	/* Firefox */
				-webkit-transform:rotate(-100deg); /* Safari 和 Chrome */
				-o-transform:rotate(-100deg); 	/* Opera */
			}
			.con_right-main{
				width: 100%;
				height: 40%;
				> p{
					text-align: center;
					line-height: 30px;
					color: #fff;
					&:nth-child(1){
						font-size: 40px;
						line-height: 60px;
					}
				}
				> div{
					width: 100%;
					margin-top: 20px;
					text-align: center;
					button{
						width: 35%;
						height: 40px;
						color: #fff;
						display: inline-block;
						border-radius: 20px;
						border: 2px solid #fff;
						background: transparent;
						cursor: pointer;
					}
				}
			}
		}
	}
}
</style>
