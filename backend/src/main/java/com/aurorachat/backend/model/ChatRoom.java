package com.aurorachat.backend.model;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoom implements Serializable {
    private String roomId;
    private String name;
}