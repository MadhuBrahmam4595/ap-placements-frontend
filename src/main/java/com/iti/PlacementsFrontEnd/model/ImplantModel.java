package com.iti.PlacementsFrontEnd.model;

public class ImplantModel {

	private String facultyName;
	private String location;
	private String implantTrade;
	private String industryName;
	private String industryAddress;
	private String hrNo;
	private String fromDate;
	private String toDate;
	private String noOfStudents;
	private String implantDist;
	private String description;

	public ImplantModel() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ImplantModel(String facultyName, String location, String implantTrade, String industryName,
			String industryAddress, String hrNo, String fromDate, String toDate, String noOfStudents,
			String implantDist, String description) {
		super();
		this.facultyName = facultyName;
		this.location = location;
		this.implantTrade = implantTrade;
		this.industryName = industryName;
		this.industryAddress = industryAddress;
		this.hrNo = hrNo;
		this.fromDate = fromDate;
		this.toDate = toDate;
		this.noOfStudents = noOfStudents;
		this.implantDist = implantDist;
		this.description = description;

	}

	public String getFacultyName() {
		return facultyName;
	}

	public void setFacultyName(String facultyName) {
		this.facultyName = facultyName;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getImplantTrade() {
		return implantTrade;
	}

	public void setImplantTrade(String implantTrade) {
		this.implantTrade = implantTrade;
	}

	public String getIndustryName() {
		return industryName;
	}

	public void setIndustryName(String industryName) {
		this.industryName = industryName;
	}

	public String getIndustryAddress() {
		return industryAddress;
	}

	public void setIndustryAddress(String industryAddress) {
		this.industryAddress = industryAddress;
	}

	public String getHrNo() {
		return hrNo;
	}

	public void setHrNo(String hrNo) {
		this.hrNo = hrNo;
	}

	public String getFromDate() {
		return fromDate;
	}

	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}

	public String getToDate() {
		return toDate;
	}

	public void setToDate(String toDate) {
		this.toDate = toDate;
	}

	public String getNoOfStudents() {
		return noOfStudents;
	}

	public void setNoOfStudents(String noOfStudents) {
		this.noOfStudents = noOfStudents;
	}

	public String getImplantDist() {
		return implantDist;
	}

	public void setImplantDist(String implantDist) {
		this.implantDist = implantDist;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "ImplantModel [facultyName=" + facultyName + ", location=" + location + ", implantTrade=" + implantTrade
				+ ", industryName=" + industryName + ", industryAddress=" + industryAddress + ", hrNo=" + hrNo
				+ ", fromDate=" + fromDate + ", toDate=" + toDate + ", noOfStudents=" + noOfStudents + ", implantDist="
				+ implantDist + ", description=" + description + "]";
	}

}
