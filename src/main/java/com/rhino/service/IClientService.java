package com.rhino.service;

import com.rhino.model.Client;
import com.rhino.vo.Result;
import org.springframework.security.access.prepost.PreAuthorize;

import java.time.LocalDate;
import java.util.List;

/**
 * Created by user on 16/12/2017.
 */
public interface IClientService {
    @PreAuthorize("isAuthenticated()")
    Result<Client> create(String clientName, String pin, LocalDate joinDate);
    @PreAuthorize("isAuthenticated()")
    Result<Client> update(Long clientId,String clientName,String pin, LocalDate joinDate);
    @PreAuthorize("isAuthenticated()")
    Result<Client> delete(Long clientId);
    @PreAuthorize("isAuthenticated()")
    Result<List<Client>> findAll();
    @PreAuthorize("isAuthenticated()")
    Result<List<Client>> searchByName(String searchStr);
}
