package com.iti.PlacementsFrontEnd.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpSession;

@Controller
public class LabsController {
	
	@GetMapping("labEntry")
	public String labEntry(HttpSession session) {
		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");

		if (jwtToken == null || !roleId.equalsIgnoreCase("4")) {
			session.invalidate();
			return "redirect:/";
		}
		return "labs/LabsEntry";
	}
	@GetMapping("labItiReport")
	public String labItiReport(HttpSession session) {
		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");
		
		if (jwtToken == null || !roleId.equalsIgnoreCase("4")) {
			session.invalidate();
			return "redirect:/";
		}
		return "labs/reports/LabItiReport";
	}
	
	@GetMapping("labsNodalReport")
	public String labsNodalReport(HttpSession session) {
		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");
		
		if (jwtToken == null || !roleId.equalsIgnoreCase("10") && !roleId.equalsIgnoreCase("11")) {
			session.invalidate();
			return "redirect:/";
		}
		return "labs/reports/LabsNodalReport";
	}
	

}
