package com.rhino.service;

import com.rhino.model.Client;
import com.rhino.repo.ClientRepo;
import com.rhino.vo.Result;
import com.rhino.vo.ResultFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

//import sun.security.x509.RFC822Name;

/**
 * Created by user on 16/12/2017.
 */
@Service("clientService")
@Transactional
public class ClientService implements IClientService {

    @Autowired
    private ClientRepo repo;

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public Result<Client> create(String clientName, String pin, LocalDate joinDate) {

        System.out.println("clientName,pin : " + clientName + ", " + pin );
        if(checkStringIsNotEmpty(clientName) && checkStringIsNotEmpty(pin) ){
            Client clientByPIN = repo.findClientByPin(pin);
            if(clientByPIN != null){
                if(clientByPIN.getClientName()!=clientName)
                    return ResultFactory.getFailResult("Client with that PIN already exists.");
                return ResultFactory.getFailResult("Client already exists.");
            }
            Client client = new Client();
            client.setClientName(clientName);
            client.setPin(pin);
            if(joinDate!=null){
                client.setJoinDate(joinDate);
            } else {
                client.setJoinDate(LocalDate.now());
            }
            repo.save(client);
            return ResultFactory.getSuccessResult(client);
        } else {
            return ResultFactory.getFailResult("Client name or PIN cannot be empty");
        }

    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public Result<Client> update(Long clientId, String clientName, String pin, LocalDate joinDate) {
        return null;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public Result<Client> delete(Long clientId) {
        return null;
    }

    @Override
    @Transactional(readOnly = true,propagation = Propagation.SUPPORTS)
    public Result<List<Client>> findAll() {
        List<Client> clients = repo.findAll();
        return ResultFactory.getSuccessResult(clients);
    }

    @Override
    @Transactional(readOnly = true,propagation = Propagation.SUPPORTS)
    public Result<List<Client>> searchByName(String searchStr) {
        //List<Client> clients = repo.findClientByClientNameLike(searchStr);
        List<Client> clients = repo.findClientsByClientNameIgnoreCaseContaining(searchStr);
        return ResultFactory.getSuccessResult(clients);
    }

    private Boolean checkStringIsNotEmpty(String inputStr){
        return !(inputStr.trim().isEmpty() || inputStr == null);
    }
}
