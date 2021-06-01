/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.restapi.entities;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
// import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
// import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author macbookpro
 */
@Entity
@Table(name = "tb_master_user_role", catalog = "macbookpro", schema = "public")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "TbMasterUserRole.findAll", query = "SELECT t FROM TbMasterUserRole t"),
    @NamedQuery(name = "TbMasterUserRole.findByRoleId", query = "SELECT t FROM TbMasterUserRole t WHERE t.roleId = :roleId"),
    @NamedQuery(name = "TbMasterUserRole.findByRoleName", query = "SELECT t FROM TbMasterUserRole t WHERE t.roleName = :roleName")})
public class TbMasterUserRole implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "role_id", nullable = false)
    private Integer roleId;
    @Size(max = 2147483647)
    @Column(name = "role_name", length = 2147483647)
    private String roleName;
    
    // @OneToMany(mappedBy = "userRoleId")
    // private Collection<TbMasterUser> tbMasterUserCollection;

    public TbMasterUserRole() {
    }

    public TbMasterUserRole(Integer roleId) {
        this.roleId = roleId;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

//    @XmlTransient
//    public Collection<TbMasterUser> getTbMasterUserCollection() {
//        return tbMasterUserCollection;
//    }
//
//    public void setTbMasterUserCollection(Collection<TbMasterUser> tbMasterUserCollection) {
//        this.tbMasterUserCollection = tbMasterUserCollection;
//    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (roleId != null ? roleId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof TbMasterUserRole)) {
            return false;
        }
        TbMasterUserRole other = (TbMasterUserRole) object;
        if ((this.roleId == null && other.roleId != null) || (this.roleId != null && !this.roleId.equals(other.roleId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.restapi.entities.TbMasterUserRole[ roleId=" + roleId + " ]";
    }
    
}
