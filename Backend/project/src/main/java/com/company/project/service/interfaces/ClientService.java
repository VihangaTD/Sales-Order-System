package com.company.project.service.interfaces;

import com.company.project.dto.ClientDto;
import com.company.project.dto.ClientUpdateRequestDto;

import java.util.List;

public interface ClientService {

    List<ClientDto> getAllClients();

    ClientDto getClientById(Long id);

    ClientDto updateClient(Long id, ClientUpdateRequestDto request);
}

