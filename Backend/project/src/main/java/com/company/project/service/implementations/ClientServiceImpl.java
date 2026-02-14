package com.company.project.service.implementations;

import com.company.project.config.ClientMapper;
import com.company.project.domain.entity.Client;
import com.company.project.dto.ClientDto;
import com.company.project.dto.ClientUpdateRequestDto;
import com.company.project.exception.ResourceNotFoundException;
import com.company.project.repository.ClientRepository;
import com.company.project.service.interfaces.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;

    @Override
    public List<ClientDto> getAllClients() {
        return clientRepository.findAll()
                .stream()
                .map(ClientMapper::toDto)
                .toList();
    }

    @Override
    public ClientDto getClientById(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Client not found"));

        return ClientMapper.toDto(client);
    }

    @Override
    public ClientDto updateClient(Long id, ClientUpdateRequestDto request) {

        Client client = clientRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Client not found"));

        client.setAddress1(request.getAddress1());
        client.setAddress2(request.getAddress2());
        client.setAddress3(request.getAddress3());
        client.setSuburb(request.getSuburb());
        client.setState(request.getState());
        client.setPostCode(request.getPostCode());

        Client updated = clientRepository.save(client);
        return ClientMapper.toDto(updated);
    }

}
