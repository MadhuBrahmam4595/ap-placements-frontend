package com.iti.PlacementsFrontEnd.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpSession;

@Controller
public class EmployeController {
	
	
	@SuppressWarnings("unused")
	@Autowired
	private Environment environment;
	
	
	@GetMapping("employeEntry")
	public String employeEntry(HttpSession session,Model model) {
		
		String jwtToken = (String)session.getAttribute("jwtToken");
		String roleId = (String)session.getAttribute("roleId");
		
		if(jwtToken == null || !roleId.equalsIgnoreCase("4")) {
			session.invalidate();
			return "redirect:/";
		} 
		return "employee/EmployeRegistration";
	}
	
	// employee ITI REPORTS
		@GetMapping("employeeITIReport")
		public String employeeITIReport(HttpSession session) {

			String jwtToken = (String) session.getAttribute("jwtToken");
			String roleId = (String) session.getAttribute("roleId");
			if (jwtToken == null || !roleId.equalsIgnoreCase("4")) {
				session.invalidate();
				return "redirect:/";
			}
			return "employee/EmployeeITIReport";

		}
		
		@GetMapping("employeeNodalReport")
		public String employeeNodalReport(HttpSession session) {

			String jwtToken = (String) session.getAttribute("jwtToken");
			String roleId = (String) session.getAttribute("roleId");
			if (jwtToken == null || !roleId.equalsIgnoreCase("10")) {
				session.invalidate();
				return "redirect:/";
			}
			return "employee/EmployeeNodalReport";

		}

		//Employee Services Service Controller
		@GetMapping("employeServiceEntry")
		public String employeServiceEntry(HttpSession session) {

			String jwtToken = (String) session.getAttribute("jwtToken");
			String roleId = (String) session.getAttribute("roleId");
			if (jwtToken == null || !roleId.equalsIgnoreCase("4")) {
				session.invalidate();
				return "redirect:/";
			}
			return "employee/EmployeeServiceDetails";

		}
		
		//Private Students Data Entry
		@GetMapping("privateStudentsEntry")
		public String privateStudentsEntry(HttpSession session,Model model) {
				
				String jwtToken = (String)session.getAttribute("jwtToken");
				String roleId = (String)session.getAttribute("roleId");
				
				if(jwtToken == null || !roleId.equalsIgnoreCase("3")) {
					session.invalidate();
					return "redirect:/";
				} 
				return "employee/PrivateStudentData";
	}


}
