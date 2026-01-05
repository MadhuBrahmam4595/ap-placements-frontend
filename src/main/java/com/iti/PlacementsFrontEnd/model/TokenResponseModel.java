package com.iti.PlacementsFrontEnd.model;

import java.util.Map;

public class TokenResponseModel {
	
	private String jwtToken;
	private Map<String, String> data;
	
	public TokenResponseModel() {
		super();
		// TODO Auto-generated constructor stub
	}

	public TokenResponseModel(String jwtToken, Map<String, String> data) {
		super();
		this.jwtToken = jwtToken;
		this.data = data;
	}

	public String getJwtToken() {
		return jwtToken;
	}

	public void setJwtToken(String jwtToken) {
		this.jwtToken = jwtToken;
	}

	public Map<String, String> getData() {
		return data;
	}

	public void setData(Map<String, String> data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "TokenResponseModel [jwtToken=" + jwtToken + ", data=" + data + "]";
	}

}

