// src/main/java/com/example/collaborativeeditor/controller/DocumentController.java
package com.example.collaborativeeditor.controller;

import com.example.collaborativeeditor.model.Document;
import com.example.collaborativeeditor.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @GetMapping
    public List<Document> getAllDocuments() {
        return documentService.getAllDocuments();
    }

    @GetMapping("/documents/view")
    public String viewDocuments(Model model) {
        List<Document> documents = documentService.getAllDocuments();
        model.addAttribute("documents", documents);
        return "documents";
    }


    @PostMapping
    public Document createDocument(@RequestBody Document document) {
        System.out.println("Received request to create document: " + document.getTitle());
        return documentService.saveDocument(document);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Document> updateDocument(@PathVariable Long id, @RequestBody Document document) {
        document.setId(id);
        Document updatedDocument = documentService.saveDocument(document);
        return ResponseEntity.ok(updatedDocument);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable Long id) {
        documentService.deleteDocument(id);
        return ResponseEntity.ok().build();
    }
}
