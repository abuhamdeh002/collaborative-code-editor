package com.example.collaborativeeditor.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/files")
public class FileController {

    private Map<Long, String> fileStore = new HashMap<>();
    private Long fileIdCounter = 1L;

    @PostMapping("/create")
    public ResponseEntity<?> createFile(@RequestBody FileRequest request) {
        Long fileId = fileIdCounter++;
        fileStore.put(fileId, request.getContent());
        return ResponseEntity.ok("File created with ID: " + fileId);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editFile(@PathVariable Long id, @RequestBody EditRequest request) {
        if (!fileStore.containsKey(id)) {
            return ResponseEntity.status(404).body("File not found");
        }
        fileStore.put(id, request.getContent());
        return ResponseEntity.ok("File updated with ID: " + id);
    }
}
