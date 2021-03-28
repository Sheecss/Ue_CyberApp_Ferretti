package com.example.rdv;

import lombok.*;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Date;

import javax.persistence.Entity;

@Entity
@Data
@NoArgsConstructor
public class Rdv {

	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDoctorname() {
		return Doctorname;
	}
	public void setDoctorname(String doctorname) {
		Doctorname = doctorname;
	}
	public String getPatientname() {
		return Patientname;
	}
	public void setPatientname(String patientname) {
		Patientname = patientname;
	}
	public String getType() {
		return Type;
	}
	public void setType(String type) {
		Type = type;
	}
	public String getLieu() {
		return Lieu;
	}
	public void setLieu(String lieu) {
		Lieu = lieu;
	}
	public ZonedDateTime getDate() {
		return date;
	}
	public void setDate(ZonedDateTime date) {
		this.date = date;
	}
	
	@Id @GeneratedValue
    private Long id;
    private @NonNull String Doctorname;
    private @NonNull String Patientname;
    private @NonNull String Type;
    private @NonNull String Lieu;
    private ZonedDateTime date;
}

