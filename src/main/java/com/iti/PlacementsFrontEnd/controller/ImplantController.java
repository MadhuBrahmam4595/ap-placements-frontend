package com.iti.PlacementsFrontEnd.controller;

import java.util.Base64;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.iti.PlacementsFrontEnd.model.inplant.IndustryMaster;

import jakarta.servlet.http.HttpSession;

@Controller
public class ImplantController {
	
	private static final Logger logger = LoggerFactory.getLogger(ImplantController.class);

	@Autowired
	private Environment environment;

	// IMPLANT IMPLANT IMPLANT TABLE APIs
	// IMPLANT DATA ENTRY APIs
	@GetMapping("implantEntry")
	public String implantEntry(HttpSession session, Model model) {

		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");

		if (jwtToken == null || !roleId.equalsIgnoreCase("4")) {
			session.invalidate();
			return "redirect:/";
		}
		return "implant/ImplantEntry";

	}

	// IMPLANT REPORTS
	@GetMapping("implantITIReport")
	public String implantITIReport(HttpSession session) {

		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");
		if (jwtToken == null || !roleId.equalsIgnoreCase("4")) {
			session.invalidate();
			return "redirect:/";
		}
		return "implant/ImplantITIReport";

	}

	@GetMapping("implantDistReport")
	public String implantDistReport(HttpSession session) {
		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");
		if (jwtToken == null || !roleId.equalsIgnoreCase("3")) {
			session.invalidate();
			return "redirect:/";
		}
		return "implant/ImplantDistReport";
	}

	@GetMapping("implantNodalReport")
	public String implantNodalReport(HttpSession session) {
		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");
		if (jwtToken == null || !roleId.equalsIgnoreCase("10") && !roleId.equalsIgnoreCase("11")) {
			session.invalidate();
			return "redirect:/";
		}
		return "implant/ImplantNodalReport";
	}

	// INDUSTRY INDUSTRY INDUSTRY TABLE APIs
	@GetMapping("industryEntry")
	public String industryEntry(HttpSession session) {
		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");
		System.out.println("jwtToken=>" + jwtToken);
		System.out.println("roleId=>" + roleId);
		if (jwtToken == null || !roleId.equalsIgnoreCase("10")) {
			System.out.println("============redirect=============");
			return "redirect:/";
		}
		return "implant/IndustryEntry";
	}

	@GetMapping("industryMasterReportNodal")
	public String industryMasterReportNodal(HttpSession session) {
		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");
		if (jwtToken == null || !roleId.equalsIgnoreCase("10")) {
			return "redirect:/";
		}
		return "implant/reports/IndustryMasterReportNodal";
	}
	
	@GetMapping("industryMasterReportNodalPreview")
	public String industryMasterReportNodalPreview(HttpSession session) {
		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");
		if (jwtToken == null || !roleId.equalsIgnoreCase("10")) {
			return "redirect:/";
		}
		return "implant/reports/IndustryMasterPreviewNodal";
	}

	@GetMapping("industryITIMapping")
	public String industryITIMapping(HttpSession session) {
		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");
		if (jwtToken == null || !roleId.equalsIgnoreCase("10")) {
			return "redirect:/";
		}
		return "implant/IndustryITIMapping";
	}

	@GetMapping("industryITIMappingITI")
	public String industryITIMappingITI(HttpSession session) {
		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");
		if (jwtToken == null || !roleId.equalsIgnoreCase("4")) {
			return "redirect:/";
		}
		return "implant/IndustryITIMappingITI";
	}

	@GetMapping("industryITIMappingReportNodal")
	public String industryITIMappingReportNodal(HttpSession session) {
		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");
		if (jwtToken == null || !roleId.equalsIgnoreCase("10") && !roleId.equalsIgnoreCase("11")) {
			return "redirect:/";
		}
		return "implant/reports/IndustryITIMappingReportNodal";
	}

	// Edit Industry Master
	@PostMapping("editIndustryMaster")
	public String editIndustryMaster(@RequestParam("industryId") String industryId, HttpSession session,
			RedirectAttributes redirectAttributes,Model model) {
		System.out.println("./editIndustryMaster=>industryId=>" + industryId);

		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");
		if (jwtToken == null || !roleId.equalsIgnoreCase("10")) {
			return "redirect:/";
		}

		try {
			RestTemplate restTemplate = new RestTemplate();
			String property = environment.getProperty("apisUrlClass");

			byte[] decodedBytes = Base64.getDecoder().decode(industryId);
			String decodedString = new String(decodedBytes);
			System.out.println(decodedString);

			HttpHeaders httpHeaders = new HttpHeaders();
			httpHeaders.set("Authorization", "Bearer " + jwtToken);
			HttpEntity<String> httpEntity = new HttpEntity<String>(httpHeaders);

//			ResponseEntity<IndustryMaster> exchange = restTemplate.exchange(
//					property + "implant/getIndustryMasterById?industryId=" + decodedString, HttpMethod.GET, httpEntity,
//					IndustryMaster.class);
//			System.out.println("exchange=>" + exchange.getBody());
			ResponseEntity<IndustryMaster> exchange = restTemplate.exchange(
					"http://10.96.64.63:8080/placementsbe/implant/getIndustryMasterById?industryId=" + decodedString, HttpMethod.GET, httpEntity,
					IndustryMaster.class);
			System.out.println("exchange=>" + exchange.getBody());
			if (exchange.getStatusCode().is2xxSuccessful()) {
				IndustryMaster body = exchange.getBody();
				model.addAttribute("industryMaster", body);
				return "implant/EditIndustryMaster";
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			redirectAttributes.addFlashAttribute("errorMsg", " NO DATA FOUND  ");
			return "redirect:/industryMasterReportNodalPreview";
		}
		redirectAttributes.addFlashAttribute("errorMsg", " NO DATA FOUND  ");
		return "redirect:/industryMasterReportNodalPreview";
	}
	
	//save edit industry master details
	@PostMapping("updateIndustryMaster")
	public String saveIndustryMaster(@ModelAttribute("industryMaster") IndustryMaster industryMaster,HttpSession session,
			RedirectAttributes redirectAttributes) {
		System.out.println("./saveIndustryMaster/industryMaster=>"+industryMaster.toString());
		
		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");
		if (jwtToken == null || !roleId.equalsIgnoreCase("10")) {
			return "redirect:/";
		}
		String msg = "";
		try {
			RestTemplate restTemplate = new RestTemplate();
			
			HttpHeaders httpHeaders = new HttpHeaders();
			httpHeaders.add("Authorization", "Bearer " + jwtToken);
			HttpEntity<IndustryMaster> httpEntity = new HttpEntity<IndustryMaster>(industryMaster,httpHeaders);
			
			String apisUrlClass = environment.getProperty("apisUrlClass");
			
			ResponseEntity<String> postForEntity = restTemplate.postForEntity(apisUrlClass+"implant/updateIndustryMaster", httpEntity, String.class);
			System.out.println("postForEntity=>"+postForEntity.getBody());
			msg = postForEntity.getBody();
			if(postForEntity.getStatusCode().is2xxSuccessful()) {
				redirectAttributes.addFlashAttribute("successMsg", postForEntity.getBody().toString());
				return "redirect:/industryMasterReportNodalPreview";
			}
		} catch (RestClientException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			redirectAttributes.addFlashAttribute("errorMsg", msg);
			return "redirect:/industryMasterReportNodalPreview";
		}
		redirectAttributes.addFlashAttribute("errorMsg", "Something went wrong");
		return "redirect:/industryMasterReportNodalPreview";
	}
	//delete industry master
	@PostMapping("deleteIndustryMaster")
	public String deleteIndustryMaster(@RequestParam("industryId") String industryId, HttpSession session,
			RedirectAttributes redirectAttributes) {
		System.out.println("./deleteIndustryMaster/industryId=>"+industryId);
		
		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");
		if (jwtToken == null || !roleId.equalsIgnoreCase("10")) {
			return "redirect:/";
		}
		try {
			RestTemplate restTemplate = new RestTemplate();
			
			byte[] decodedBytes = Base64.getDecoder().decode(industryId);
			String decodedString = new String(decodedBytes);
			System.out.println(decodedString);
			
			HttpHeaders httpHeaders = new HttpHeaders();
			httpHeaders.add("Authorization", "Bearer " + jwtToken);
			HttpEntity<String> httpEntity = new HttpEntity<String>(httpHeaders);
			
			String apisUrlClass = environment.getProperty("apisUrlClass");
			
			ResponseEntity<String> exchange = restTemplate.exchange(apisUrlClass+"implant/deleteIndustryMaster?industryId="+decodedString, HttpMethod.DELETE, httpEntity, String.class);
			System.out.println("exchange=>"+exchange.getBody());
			
			if(exchange.getStatusCode().is2xxSuccessful()) {
				redirectAttributes.addFlashAttribute("successMsg", exchange.getBody().toString());
				return "redirect:/industryMasterReportNodalPreview";
			}else {
				redirectAttributes.addFlashAttribute("errorMsg", exchange.getBody().toString());
				return "redirect:/industryMasterReportNodalPreview";
			}
		} catch (RestClientException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			redirectAttributes.addFlashAttribute("errorMsg", "Exception arised while deleting industry master");
			return "redirect:/industryMasterReportNodalPreview";
		}
	}

	//edist industries data
	@PostMapping("editIndustries")
	public String editIndustries(HttpSession session,@RequestParam("slno") String slno,Model model,
			RedirectAttributes redirectAttributes) {
		System.out.println("/editIndustries/slno=>"+slno);
		
		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");
		if (jwtToken == null || !roleId.equalsIgnoreCase("4")) {
			return "redirect:/";
		}
		// Decode the slno (serial number)
	    byte[] decodedBytes = Base64.getDecoder().decode(slno);
	    String decodedString = new String(decodedBytes);
	    System.out.println("Decoded slno: " + decodedString);
	    
	    model.addAttribute("slno", decodedString);
	    return "implant/EditInplantIndustries";
	    
	}
	@GetMapping("saveIndustries")
	public String saveIndustries(HttpSession session,RedirectAttributes redirectAttributes) {
		System.out.println("=================saveIndustries==================");
		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");
		if (jwtToken == null || !roleId.equalsIgnoreCase("4")) {
			return "redirect:/";
		}
		redirectAttributes.addFlashAttribute("updateMsg", "Given details are updated successfully.");
		return "redirect:/industryITIMappingITI";
	}
	
	//Trainees Report
	@GetMapping("inplantTraineesReport")
	public String inplantTraineesReport(HttpSession session) {
		System.out.println("=================saveIndustries==================");
		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");
		if (jwtToken == null || !roleId.equalsIgnoreCase("10") && !roleId.equalsIgnoreCase("11")) {
			return "redirect:/";
		}
		return "implant/reports/InplantTraineesReport";
	}
	
	// Inplant Datewise Report
	@GetMapping("inplantDatewiseReport")
	public String inplantDatewiseReport(HttpSession session) {
		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");
		logger.info("jwtToken=>"+jwtToken);
		logger.info("roleId=>"+roleId);
		if (jwtToken == null || !roleId.equalsIgnoreCase("10") && !roleId.equalsIgnoreCase("11")) {
			return "redirect:/";
		}
		return "implant/reports/InplantDatewiseReport";
	}
	
	@GetMapping("inplantYearwiseReport")
	public String inplantYearwiseReport(HttpSession session) {
		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");
		logger.info("jwtToken=>"+jwtToken);
		logger.info("roleId=>"+roleId);
		if (jwtToken == null || !roleId.equalsIgnoreCase("10") && !roleId.equalsIgnoreCase("11")) {
			
			return "redirect:/";
		}
		return "implant/reports/InplantTraineeTrainingNodalReport";
	}
	
	//Inplant 1 complete year and before year 24 months data 
	
	@GetMapping("inplantTwoYearwiseReport")
	public String inplantTwoYearwiseReport(HttpSession session) {
		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");
		logger.info("jwtToken=>"+jwtToken);
		logger.info("roleId=>"+roleId);
		if (jwtToken == null || !roleId.equalsIgnoreCase("10") && !roleId.equalsIgnoreCase("11")) {
			
			return "redirect:/";
		}
		return "implant/reports/InplantTwoYearNodalReport";
	}
	
	
	
	//======================INDUSTRY PARTNER DETAILS=================
	@GetMapping("industryPartnerDetails")
	public String industryPartnerDetails(HttpSession session) {
		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");
		logger.info("jwtToken=>"+jwtToken);
		logger.info("roleId=>"+roleId);
		if (jwtToken == null || !roleId.equalsIgnoreCase("10") && !roleId.equalsIgnoreCase("11")) {
			return "redirect:/";
		}
		return "implant/IndustryPartnerDetails";
	}
	@GetMapping("industryPartnerDetailsNodalReport")
	public String industryPartnerDetailsNodalReport(HttpSession session) {
		String jwtToken = (String) session.getAttribute("jwtToken");
		String roleId = (String) session.getAttribute("roleId");
		logger.info("jwtToken=>"+jwtToken);
		logger.info("roleId=>"+roleId);
		if (jwtToken == null || !roleId.equalsIgnoreCase("10") && !roleId.equalsIgnoreCase("11")) {
			return "redirect:/";
		}
		return "implant/reports/IndustryPartnerDetailsNodalReport";
	}
	
}
