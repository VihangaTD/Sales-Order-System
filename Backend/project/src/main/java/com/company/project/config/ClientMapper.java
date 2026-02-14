package com.company.project.config;

import com.company.project.domain.entity.Client;
import com.company.project.dto.ClientDto;

public class ClientMapper {
    private ClientMapper() {}

    public static ClientDto toDto(Client c) {
        if (c == null) return null;
        return ClientDto.builder()
                .id(c.getId())
                .name(c.getName())
                .address1(c.getAddress1())
                .address2(c.getAddress2())
                .address3(c.getAddress3())
                .suburb(c.getSuburb())
                .state(c.getState())
                .postCode(c.getPostCode())
                .build();
    }
}

