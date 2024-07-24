//package com.example.planner;
//
//import com.example.planner.model.Event;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/events")
//public class EventRESTController {
//    private EventRepository eventRepository;
//
//    @Autowired
//    public EventRESTController(EventRepository eventRepository) {
//        this.eventRepository = eventRepository;
//    }
//
//    @RequestMapping(method = RequestMethod.GET)
//    public List<Event> findAllEvents() {
//        return eventRepository.findAll();
//    }
//
//}
