package com.iti.PlacementsFrontEnd.model;

import java.time.LocalDateTime;

public class IndustriesEntity {
	
	private Long slno;
	private Long industryId;
	private String industryName;
	private String industryType;
	private String distName;
	private Integer distCode;
	private String itiName;
	private Integer itiCode;
	private String ncvtMisCode;
	private String noOfTrades;
	private String tradeName;
	private Integer tradeCode;
	private String tradeShort;
	private String noOfUnits;
	private LocalDateTime entryTime;
	private String entryBy;
	public IndustriesEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
	public IndustriesEntity(Long slno, Long industryId, String industryName, String industryType, String distName,
			Integer distCode, String itiName, Integer itiCode, String ncvtMisCode, String noOfTrades, String tradeName,
			Integer tradeCode, String tradeShort, String noOfUnits, LocalDateTime entryTime, String entryBy) {
		super();
		this.slno = slno;
		this.industryId = industryId;
		this.industryName = industryName;
		this.industryType = industryType;
		this.distName = distName;
		this.distCode = distCode;
		this.itiName = itiName;
		this.itiCode = itiCode;
		this.ncvtMisCode = ncvtMisCode;
		this.noOfTrades = noOfTrades;
		this.tradeName = tradeName;
		this.tradeCode = tradeCode;
		this.tradeShort = tradeShort;
		this.noOfUnits = noOfUnits;
		this.entryTime = entryTime;
		this.entryBy = entryBy;
	}
	public Long getSlno() {
		return slno;
	}
	public void setSlno(Long slno) {
		this.slno = slno;
	}
	public Long getIndustryId() {
		return industryId;
	}
	public void setIndustryId(Long industryId) {
		this.industryId = industryId;
	}
	public String getIndustryName() {
		return industryName;
	}
	public void setIndustryName(String industryName) {
		this.industryName = industryName;
	}
	public String getIndustryType() {
		return industryType;
	}
	public void setIndustryType(String industryType) {
		this.industryType = industryType;
	}
	public String getDistName() {
		return distName;
	}
	public void setDistName(String distName) {
		this.distName = distName;
	}
	public Integer getDistCode() {
		return distCode;
	}
	public void setDistCode(Integer distCode) {
		this.distCode = distCode;
	}
	public String getItiName() {
		return itiName;
	}
	public void setItiName(String itiName) {
		this.itiName = itiName;
	}
	public Integer getItiCode() {
		return itiCode;
	}
	public void setItiCode(Integer itiCode) {
		this.itiCode = itiCode;
	}
	public String getNcvtMisCode() {
		return ncvtMisCode;
	}
	public void setNcvtMisCode(String ncvtMisCode) {
		this.ncvtMisCode = ncvtMisCode;
	}
	public String getNoOfTrades() {
		return noOfTrades;
	}
	public void setNoOfTrades(String noOfTrades) {
		this.noOfTrades = noOfTrades;
	}
	public String getTradeName() {
		return tradeName;
	}
	public void setTradeName(String tradeName) {
		this.tradeName = tradeName;
	}
	public Integer getTradeCode() {
		return tradeCode;
	}
	public void setTradeCode(Integer tradeCode) {
		this.tradeCode = tradeCode;
	}
	public String getTradeShort() {
		return tradeShort;
	}
	public void setTradeShort(String tradeShort) {
		this.tradeShort = tradeShort;
	}
	public String getNoOfUnits() {
		return noOfUnits;
	}
	public void setNoOfUnits(String noOfUnits) {
		this.noOfUnits = noOfUnits;
	}
	public LocalDateTime getEntryTime() {
		return entryTime;
	}
	public void setEntryTime(LocalDateTime entryTime) {
		this.entryTime = entryTime;
	}
	public String getEntryBy() {
		return entryBy;
	}
	public void setEntryBy(String entryBy) {
		this.entryBy = entryBy;
	}
	@Override
	public String toString() {
		return "IndustriesEntity [slno=" + slno + ", industryId=" + industryId + ", industryName=" + industryName
				+ ", industryType=" + industryType + ", distName=" + distName + ", distCode=" + distCode + ", itiName="
				+ itiName + ", itiCode=" + itiCode + ", ncvtMisCode=" + ncvtMisCode + ", noOfTrades=" + noOfTrades
				+ ", tradeName=" + tradeName + ", tradeCode=" + tradeCode + ", tradeShort=" + tradeShort
				+ ", noOfUnits=" + noOfUnits + ", entryTime=" + entryTime + ", entryBy=" + entryBy + "]";
	}
	
	

}
