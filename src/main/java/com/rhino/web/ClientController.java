package com.rhino.web;

import com.rhino.model.Client;
import com.rhino.service.IClientService;
import com.rhino.vo.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.List;

/**
 * Created by user on 16/12/2017.
 */
@RestController
@RequestMapping(value = "/client", produces = "application/json")
public class ClientController extends AbstractHandler {

    @Autowired
    private IClientService service;

    @PostMapping(value = "/create")
    @ResponseBody
    public String create(HttpServletRequest request, @RequestBody ClientDTO clientCreator ){
//        System.out.println("Create endpoint");
//        System.out.println("ClientDTO :" + clientCreator.clientName + " pin: " + clientCreator.pin);
        Result<Client> ar = service.create(clientCreator.clientName,clientCreator.pin, clientCreator.joinDate);
        if(ar.isSuccess()){
            return getJsonSuccessData(ar.getData());
        } else {
            return getJsonErrorMsg(ar.getMsg());
        }
    }

    @PostMapping(value = "/update")
    @ResponseBody
    public String update(@RequestBody ClientDTO clientCreator){
        Result<Client> ar = service.update(clientCreator.clientId,
                clientCreator.clientName,clientCreator.pin,clientCreator.joinDate);
        if(ar.isSuccess()){
            return getJsonSuccessData(ar.getData());
        } else {
            return getJsonErrorMsg(ar.getMsg());
        }
    }

    @GetMapping(value = "/findAll")
    @ResponseBody
    public String findAll(){
        Result<List<Client>> ar = service.findAll();
        if(ar.isSuccess()){
            return getJsonSuccessData(ar.getData());
        } else {
            return getJsonErrorMsg(ar.getMsg());
        }
    }

    @GetMapping(value = "/search")
    @ResponseBody
    public String search(@RequestParam(name = "q") String query){
        Result<List<Client>> ar = service.searchByName(query);
        if(ar.isSuccess()){
            return getJsonSuccessData(ar.getData());
        } else {
            return getJsonErrorMsg(ar.getMsg());
        }
    }

    static class ClientDTO{
        String clientName,pin;
        LocalDate joinDate;
        Long clientId;
    }

}
