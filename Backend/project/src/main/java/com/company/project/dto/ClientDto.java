package com.company.project.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientDto {
    private Long id;
    private String name;

    private String address1;
    private String address2;
    private String address3;

    private String suburb;
    private String state;
    private String postCode;
}
