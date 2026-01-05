package com.iti.PlacementsFrontEnd.model;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class LoginModel {
	
	@Size(min = 5, max = 50)
	@NotEmpty
	@NotNull
	private String username;
//	@Size(min = 5, max = 50)
	@NotEmpty
	@NotNull
	private String password;
	
	
	public LoginModel() {
		super();
		// TODO Auto-generated constructor stub
	}
	public LoginModel(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@Override
	public String toString() {
		return "LoginModel [username=" + username + ", password=" + password + "]";
	}
	
	

}


