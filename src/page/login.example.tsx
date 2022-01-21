import React from "react";
import { Form, Input, Button, message, Icon, useForm } from "../index";
import { linkTo } from "@storybook/addon-links";

function Login() {
	const [handleSubmit, callbackObj, validate, blurObj] = useForm([
		{
			name: "username",
			validate: [{ validate: (e) => e !== "", message: "用户名不能为空" }]
		},
		{
			name: "password",
			validate: [
				{ validate: (e) => e !== "", message: "密码不为空" },
				{
					validate: (e) => e.length > 2 && e.length < 7,
					message: "密码必须大于2位或者小于7位"
				}
			]
		}
	]);
	const onSubmit = (data: any) => {
		if (
			validate.username.length === 0 &&
			validate.password.length === 0 &&
			data &&
			data.username &&
			data.password
		) {
			console.log(data);
			message.info("进入提交流程");
		} else {
			message.danger("验证失败", {});
		}
	};
	return (
		<>
			<div
				className="bigbear-layout-block-default"
				style={{ textAlign: "center", fontWeight: 700, padding: "20px" }}
			>
				用户登录
			</div>

			<Form className="login-form bigbear-form">
				<div
					style={{
						textAlign: "center",
						padding: "20px",
						marginBottom: "20px",
						fontWeight: 700,
						fontSize: "20px"
					}}
				>
					BIGBEAR-UI
				</div>
				<Input
					prepend={<Icon icon="user"></Icon>}
					callback={(e) => callbackObj.username(e.target.value)}
					onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
						blurObj.username(e.target.value);
					}}
					placeholder="用户名"
				></Input>
				<div className="bigbear-form-validate">
					{validate.username.map((v: string) => v)}
				</div>
				<Input
					prepend={<Icon icon="lock"></Icon>}
					type="password"
					callback={(e) => callbackObj.password(e.target.value)}
					onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
						blurObj.password(e.target.value);
					}}
					placeholder="密码"
				></Input>
				<div className="bigbear-form-validate">
					{validate.password.map((v: string, i: number) => (
						<div key={i}>{v}</div>
					))}
				</div>

				<div>
					<Button
						style={{ width: "100%", marginBottom: "20px" }}
						btnType="info"
						onClick={() => {
							handleSubmit(onSubmit);
						}}
					>
						提交
					</Button>
					<Button
						style={{ width: "100%" }}
						btnType="success"
						onClick={linkTo("PAGE | Register Page 注册页", "default")}
					>
						马上注册
					</Button>
				</div>
			</Form>
		</>
	);
}
export default Login;
