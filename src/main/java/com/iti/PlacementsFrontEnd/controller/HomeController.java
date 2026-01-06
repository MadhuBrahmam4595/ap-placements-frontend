package com.iti.PlacementsFrontEnd.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.iti.PlacementsFrontEnd.model.ClaimsModel;
import com.iti.PlacementsFrontEnd.model.LoginModel;
import com.iti.PlacementsFrontEnd.model.TokenResponseModel;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Value("${authenticate}") private String authenticate;
	@Value("${getallClaims}") private String getallClaims;
	@Value("${apisUrl}") private String apisUrl;
	@Value("${apisUrlClass}") private String apisUrlClass;
	
	
	
	@GetMapping("/")
	public String home(Model model,HttpSession session) {
		logger.info("/");
		session.invalidate();
		model.addAttribute("bean", new LoginModel());
		model.addAttribute("apisUrl", apisUrl);
		return "public/Home";
	}

	@GetMapping("/test")
	public String test(Model model,HttpSession session) {
		logger.info("/test");
		session.invalidate();
		model.addAttribute("bean", new LoginModel());
		model.addAttribute("apisUrl", apisUrl);
		return "public/test";
	}
	
	@PostMapping(value="/userLogin")
	public String userLogin(@Valid @ModelAttribute("bean") LoginModel bean,BindingResult bindingResult,Model model,
			RedirectAttributes redirectAttributes,HttpServletRequest httpServletRequest) {
		System.out.println("bean=>"+bean.toString());
		
		if (bindingResult.hasErrors()) { System.out.println("hasErros"); return "public/Login"; }
		 
		try {
			RestTemplate restTemplate = new RestTemplate();
			logger.info("authenticate=>"+authenticate);
			ResponseEntity<TokenResponseModel> response = restTemplate.postForEntity(authenticate, bean, TokenResponseModel.class);
			System.out.println("responseBody=>"+response.getBody());

			TokenResponseModel tokenResponseModel = new TokenResponseModel();
			if (response.getStatusCode().is2xxSuccessful()) {
				logger.info(response.getBody().getJwtToken());
				tokenResponseModel.setJwtToken(response.getBody().getJwtToken());
//				tokenResponseModel.setMenuItems(response.getBody().getMenuItems()); 
			}
			
			HttpSession session = httpServletRequest.getSession();
			session.setAttribute("jwtToken", tokenResponseModel.getJwtToken());
//			logger.info("list size=>"+tokenResponseModel.getMenuItems().size());
//			session.setAttribute("navList", tokenResponseModel.getMenuItems());
			
			HttpHeaders httpHeaders = new HttpHeaders();
			httpHeaders.set("Authorization", "Bearer "+tokenResponseModel.getJwtToken());
			HttpEntity<String> httpEntity = new HttpEntity<String>(httpHeaders);
			
			ResponseEntity<ClaimsModel> claims = restTemplate.postForEntity(getallClaims, httpEntity, ClaimsModel.class);
			System.out.println("responseBody=>"+claims.getBody());
			
			session.setAttribute("roleId", claims.getBody().getRoleId());
			session.setAttribute("insCode", claims.getBody().getInsCode());
			session.setAttribute("username", claims.getBody().getUsername());
			session.setAttribute("insName", claims.getBody().getInsName());
			session.setAttribute("apisUrl", apisUrl);
			
			return "userpages/LoginSuccess";
			
		}catch (RestClientException e) {
			// TODO Auto-generated catch block
			System.out.println("RestClientException"+e);
			e.printStackTrace();
			redirectAttributes.addFlashAttribute("msg", "Username, Password is not matched OR Something went wrong while logging.");
			return "redirect:/";
			
		}
				
	}
	@GetMapping("loginSuccess")
	public String loginSuccess(HttpSession session) {
		String jwtToken = (String)session.getAttribute("jwtToken");
		if(jwtToken == null) {
			return "redirect:/";
		}
		return "userpages/LoginSuccess";
	}
	
	@GetMapping("/logout")
	public String logout(Model model,HttpSession session) {
		session.invalidate();
		return "redirect:/";
	}
	
	@GetMapping("userCreation")
	public String userCreation(HttpSession session) {
		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");

		if (jwtToken == null || !roleId.equalsIgnoreCase("10")) {
			session.invalidate();
			return "redirect:/";
		}
		return "userpages/UserCreation";
	}
	@GetMapping("usersList")
	public String usersList(HttpSession session) {
		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");
		
		if (jwtToken == null || !roleId.equalsIgnoreCase("10")) {
			session.invalidate();
			return "redirect:/";
		}
		return "userpages/UsersList";
	}
	
	@GetMapping("changeUserDetails")
	public String changeUserDetails(HttpSession session) {
		String jwtToken = (String) session.getAttribute("jwtToken");
		
		if (jwtToken == null) {
			session.invalidate();
			return "redirect:/";
		}
		return "userpages/ChangeUserDetails";
	}
	
	@PostMapping("editUserDetails")
	public String editUserDetails(HttpSession session,@RequestParam("username") String username, @RequestParam("password") String password,
			RedirectAttributes redirectAttributes,Model model) {
		
		logger.info("editUserDetails=>username=>"+username);
		logger.info("editUserDetails=>password=>"+password);
		
		String jwtToken = (String) session.getAttribute("jwtToken");
		if (jwtToken == null) {
			session.invalidate();
			return "redirect:/";
		}
		
		try {
			
			RestTemplate restTemplate = new RestTemplate();
			HttpHeaders httpHeaders = new HttpHeaders();
			httpHeaders.add("Authorization", "Bearer "+jwtToken);
			
			LoginModel loginModel = new LoginModel(username, password);
			HttpEntity<LoginModel> httpEntity = new HttpEntity<LoginModel>(loginModel, httpHeaders);
			
			ResponseEntity<String> postForEntity = restTemplate.postForEntity(apisUrlClass+"services/editUserDetails", httpEntity, String.class);
			logger.info("postForEntity=body=>"+postForEntity.getBody());
			
			if(postForEntity.getStatusCode().is2xxSuccessful()) {
				redirectAttributes.addFlashAttribute("successMsg", postForEntity.getBody());
				return "redirect:/";
			}else {
				model.addAttribute("errorMsg", "Usernames are not matched for update password");
				return "userpages/ChangeUserDetails";
			}
		}catch(Exception e) {
			e.printStackTrace();
			model.addAttribute("errorMsg", "Usernames are not matched for update password");
			return "userpages/ChangeUserDetails";
		}
	}
	
	@GetMapping("userUpdation")
	public String userUpdation(HttpSession session) {
		String jwtToken = (String) session.getAttribute("jwtToken");
		
		if (jwtToken == null) {
			session.invalidate();
			return "redirect:/";
		}
		return "userpages/UserUpdation";
	}
	
	
}
