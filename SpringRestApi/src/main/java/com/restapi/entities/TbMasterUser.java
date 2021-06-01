/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.restapi.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author macbookpro
 */
@Entity
@Table(name = "tb_master_user", catalog = "macbookpro", schema = "public")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "TbMasterUser.findAll", query = "SELECT t FROM TbMasterUser t"),
    @NamedQuery(name = "TbMasterUser.findByUserId", query = "SELECT t FROM TbMasterUser t WHERE t.userId = :userId"),
    @NamedQuery(name = "TbMasterUser.findByUserName", query = "SELECT t FROM TbMasterUser t WHERE t.userName = :userName"),
    // @NamedQuery(name = "TbMasterUser.findLikeByUserName", query = "SELECT t FROM TbMasterUser t WHERE t.userName LIKE ?1"),
    @NamedQuery(name = "TbMasterUser.findByUserGenre", query = "SELECT t FROM TbMasterUser t WHERE t.userGenre = :userGenre"),
    @NamedQuery(name = "TbMasterUser.findByUserBirthday", query = "SELECT t FROM TbMasterUser t WHERE t.userBirthday = :userBirthday"),
    @NamedQuery(name = "TbMasterUser.findByUserAddress", query = "SELECT t FROM TbMasterUser t WHERE t.userAddress = :userAddress"),
    @NamedQuery(name = "TbMasterUser.findByUserEmail", query = "SELECT t FROM TbMasterUser t WHERE t.userEmail = :userEmail")})
public class TbMasterUser implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "user_id", nullable = false)
    private Integer userId;
    @Size(max = 2147483647)
    @Column(name = "user_name", length = 2147483647)
    private String userName;
    @Size(max = 2147483647)
    @Column(name = "user_genre", length = 2147483647)
    private String userGenre;
    @Size(max = 2147483647)
    @Column(name = "user_birthday", length = 2147483647)
    private String userBirthday;
    @Size(max = 2147483647)
    @Column(name = "user_address", length = 2147483647)
    private String userAddress;
    @Size(max = 2147483647)
    @Column(name = "user_email", length = 2147483647)
    private String userEmail;
    @JoinColumn(name = "user_role_id", referencedColumnName = "role_id")
    @ManyToOne
    private TbMasterUserRole userRoleId;

    public TbMasterUser() {
    }

    public TbMasterUser(Integer userId) {
        this.userId = userId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserGenre() {
        return userGenre;
    }

    public void setUserGenre(String userGenre) {
        this.userGenre = userGenre;
    }

    public String getUserBirthday() {
        return userBirthday;
    }

    public void setUserBirthday(String userBirthday) {
        this.userBirthday = userBirthday;
    }

    public String getUserAddress() {
        return userAddress;
    }

    public void setUserAddress(String userAddress) {
        this.userAddress = userAddress;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public TbMasterUserRole getUserRoleId() {
        return userRoleId;
    }

    public void setUserRoleId(TbMasterUserRole userRoleId) {
        this.userRoleId = userRoleId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (userId != null ? userId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof TbMasterUser)) {
            return false;
        }
        TbMasterUser other = (TbMasterUser) object;
        if ((this.userId == null && other.userId != null) || (this.userId != null && !this.userId.equals(other.userId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.restapi.entities.TbMasterUser[ userId=" + userId + " ]";
    }
    
}
