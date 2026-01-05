package com.iti.PlacementsFrontEnd.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpSession;

@Controller
public class PlacementsController {
	
	@Autowired
	private Environment environment;
	
	//Placements Schedulewise Report
	@GetMapping("plcmtScheduleswiseData")
	public String plcmtScheduleswiseData(HttpSession session,Model model) {
		
		String jwtToken = (String)session.getAttribute("jwtToken");
		String roleId = (String)session.getAttribute("roleId");
		
		if(jwtToken == null || !roleId.equalsIgnoreCase("10") && !roleId.equalsIgnoreCase("11")) {
			session.invalidate();
			return "redirect:/";
		} 
		return "plcmts/reports/PlcmtScheduleswiseData";
		
	}
	
	//Placements State Report
	@GetMapping("plcmtStateReport")
	public String plcmtStateReport(HttpSession session,Model model) {
		
		String jwtToken = (String)session.getAttribute("jwtToken");
		String roleId = (String)session.getAttribute("roleId");
		
		if(jwtToken == null || !roleId.equalsIgnoreCase("10") && !roleId.equalsIgnoreCase("11")) {
			session.invalidate();
			return "redirect:/";
		} 
		return "plcmts/reports/PlcmtStateReport";
		
	}
	
	// Year wise count report
	@GetMapping("plcmtYearWiseCountReport")
	public String plcmtYearWiseCountReport(HttpSession session,Model model) {
		
		String jwtToken = (String)session.getAttribute("jwtToken");
		String roleId = (String)session.getAttribute("roleId");
		
		if(jwtToken == null || !roleId.equalsIgnoreCase("10") && !roleId.equalsIgnoreCase("11")) {
			session.invalidate();
			return "redirect:/";
		} 
		return "plcmts/reports/PlcmtYearWiseCountReport";
		
	}
	
	// Dist Report
	@GetMapping("plcmtDistReport")
	public String plcmtDistReport(HttpSession session,Model model) {
		
		String jwtToken = (String)session.getAttribute("jwtToken");
		String roleId = (String)session.getAttribute("roleId");
		
		if(jwtToken == null || !roleId.equalsIgnoreCase("3")) {
			session.invalidate();
			return "redirect:/";
		} 
		return "plcmts/PlcmtDistReport";
	}
	
	//ITI report
	@GetMapping("plcmtItiReport")
	public String plcmtItiReport(HttpSession session,Model model) {
		
		String jwtToken = (String)session.getAttribute("jwtToken");
		String roleId = (String)session.getAttribute("roleId");
		
		if(jwtToken == null || !roleId.equalsIgnoreCase("4")) {
			session.invalidate();
			return "redirect:/";
		} 
		return "plcmts/PlcmtItiReport";
	}
	//Placement Schedule Entry
	@GetMapping("placementScheduleEntry")
	public String placementScheduleEntry(HttpSession session,Model model) {
		
		String jwtToken = (String)session.getAttribute("jwtToken");
		String roleId = (String)session.getAttribute("roleId");
		
		if(jwtToken == null || !roleId.equalsIgnoreCase("3")) {
			session.invalidate();
			return "redirect:/";
		} 
		return "plcmts/PlacementScheduleEntry";
	}
	
	//plcmt entry
	@GetMapping("placementEntry")
	public String placementEntry(HttpSession session,Model model) {
		
		String jwtToken = (String)session.getAttribute("jwtToken");
		String roleId = (String)session.getAttribute("roleId");
		
		if(jwtToken == null || !roleId.equalsIgnoreCase("4")) {
			session.invalidate();
			return "redirect:/";
		} 
		return "plcmts/PlacementEntry";
	}
	
	@PostMapping("editPlcmts")
	public String editPlcmts(@RequestParam("pid") String pid,HttpSession session,Model model) {
		
		System.out.println("/editPlcmts/pid=>"+pid);
		
		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");
		if (jwtToken == null || !roleId.equalsIgnoreCase("4")) {
			return "redirect:/";
		}
		model.addAttribute("pid", pid);
		return "plcmts/PlcmtEdit";
	}
	
	//Job and Appr data based on schedule from date and to date
	@GetMapping("plcmtScheduleDatewiseReport")
	public String scheduleDatewiseData(HttpSession session,Model model) {
		
		String jwtToken = (String)session.getAttribute("jwtToken");
		String roleId = (String)session.getAttribute("roleId");
		
		if(jwtToken == null || !roleId.equalsIgnoreCase("10") && !roleId.equalsIgnoreCase("11")) {
			session.invalidate();
			return "redirect:/";
		} 
		return "plcmts/reports/PlcmtScheduleDatewiseReport";
	}
	
	//Job and Appr , Higher Education etc current year + seniors
	@GetMapping("plcmtDataDetails")
	public String scheduleDataDetails(HttpSession session,Model model) {
		
		String jwtToken = (String)session.getAttribute("jwtToken");
		String roleId = (String)session.getAttribute("roleId");
		
		if(jwtToken == null || !roleId.equalsIgnoreCase("10") && !roleId.equalsIgnoreCase("11")) {
			session.invalidate();
			return "redirect:/";
		} 
		return "plcmts/reports/PlcmtJobDetails";
	}
	
	@GetMapping("stateSkillDevelopmentPlanReport")
	public String stateSkillDevelopmentPlanReport(HttpSession session,Model model) {
		
		String jwtToken = (String)session.getAttribute("jwtToken");
		String roleId = (String)session.getAttribute("roleId");
		
		if(jwtToken == null || !roleId.equalsIgnoreCase("10") && !roleId.equalsIgnoreCase("11")) {
			session.invalidate();
			return "redirect:/";
		} 
		return "plcmts/reports/StateSkillDevelopmentPlanReport";
	}

}
