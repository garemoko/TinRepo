TinRepo
=======

A Tin Can powered Tin Can extension repository.

NOTE: THIS IS A DRAFT DOCUMENT. URIS USED HERE ARE NOT FINAL. DO NOT IMPLEMENT!


##Introduction
###Rationale
###Approach
###Heirarchy
####Registered
####Accepted
####Recognised

##Profile
This section describes a profile of verbs and activity types used to run the repo. 
It is NOT a list of verbs and activity types contained in the repo itself. 

Currently this profile used the base URI http://tincanapi.co.uk/tinrepo/ This is subject to change. 

###Activity Types
In all cases the URI of the activity using the activity type is taken as the id of the verb, activity type, 
extension or standard document. 

#####Verb: http://tincanapi.co.uk/tinrepo/activitytypes/verb
<table>
  <tr>
    <th>Description</th>
    <th>Activity name contents</th><th>Activity description contents</th>
  </tr>
  <tr>
    <td>An activity representing a Tin Can Verb.</td>
    <td>The verb display property</td>
    <td>A description of the verb and explanation of how it should be used.</td>
  </tr>
</table>


#####Activity Type: http://tincanapi.co.uk/tinrepo/activitytypes/activity_type
<table>
  <tr>
    <th>Description</th>
    <th>Activity name contents</th><th>Activity description contents</th>
  </tr>
  <tr>
    <td>An activity representing a Tin Can activity type.</td>
    <td>Human readable name of the activity type</td>
    <td>A description of the activity type and explanation of how it should be used.</td>
  </tr>
</table>
####Extensions

#####Activity Definition Extension: http://tincanapi.co.uk/tinrepo/activitytypes/activity_definition_extension
<table>
  <tr>
    <th>Description</th>
    <th>Activity name contents</th><th>Activity description contents</th>
  </tr>
  <tr>
    <td>An activity representing a Tin Can activity definition extension.</td>
    <td>Human readable name of the activity definition extension</td>
    <td>A description of the activity definition extension and explanation of how it should be used.</td>
  </tr>
</table>


#####Result Extension: http://tincanapi.co.uk/tinrepo/activitytypes/result_extension
<table>
  <tr>
    <th>Description</th>
    <th>Activity name contents</th><th>Activity description contents</th>
  </tr>
  <tr>
    <td>An activity representing a Tin Can result extension.</td>
    <td>Human readable name of the result extension</td>
    <td>A description of the result extension and explanation of how it should be used.</td>
  </tr>
</table>

#####Context Extension: http://tincanapi.co.uk/tinrepo/activitytypes/context_extension
<table>
  <tr>
    <th>Description</th>
    <th>Activity name contents</th><th>Activity description contents</th>
  </tr>
  <tr>
    <td>An activity representing a Tin Can context extension.</td>
    <td>Human readable name of the context extension</td>
    <td>A description of the context extension and explanation of how it should be used.</td>
  </tr>
</table>

#####Attachment Extension: http://tincanapi.co.uk/tinrepo/activitytypes/attachment_extension
<table>
  <tr>
    <th>Description</th>
    <th>Activity name contents</th><th>Activity description contents</th>
  </tr>
  <tr>
    <td>An activity representing a Tin Can attachment extension.</td>
    <td>Human readable name of the attachment extension</td>
    <td>A description of the attachment extension and explanation of how it should be used.</td>
  </tr>
</table>


####Standard Documents
#####State API Document: http://tincanapi.co.uk/tinrepo/activitytypes/state_api_document
<table>
  <tr>
    <th>Description</th>
    <th>Activity name contents</th><th>Activity description contents</th>
  </tr>
  <tr>
    <td>An activity representing a Tin Can standard state api document.</td>
    <td>Human readable name of the standard state api document</td>
    <td>A description of the standard state api document and explanation of how it should be used.</td>
  </tr>
</table>

#####Agent Profile API Document: http://tincanapi.co.uk/tinrepo/activitytypes/agent_profile_api_document
<table>
  <tr>
    <th>Description</th>
    <th>Activity name contents</th><th>Activity description contents</th>
  </tr>
  <tr>
    <td>An activity representing a Tin Can standard agent profile api document.</td>
    <td>Human readable name of the standard agent profile api document</td>
    <td>A description of the standard agent profile api document and explanation of how it should be used.</td>
  </tr>
</table>

#####Activity Profile API Document: http://tincanapi.co.uk/tinrepo/activitytypes/activity_profile_api_document
<table>
  <tr>
    <th>Description</th>
    <th>Activity name contents</th><th>Activity description contents</th>
  </tr>
  <tr>
    <td>An activity representing a Tin Can standard activity profile api document.</td>
    <td>Human readable name of the standard activity profile api document</td>
    <td>A description of the standard activity profile api document and explanation of how it should be used.</td>
  </tr>
</table>

###Verbs

####Extension Verbs
The result response property may be used to explain the action taken. 

#####Registered Extension: http://tincanapi.co.uk/tinrepo/verbs/registered_extension
<table>
  <tr>
    <th>Description</th>
    <th>Authorised roles</th><th>Object</th>
  </tr>
  <tr>
    <td>The actor registered a new verb, activity type, extension or standard document with the repository.</td>
    <td>Anybody</td>
    <td>An activity with any of the activity types defined in this profile</td>
  </tr>
</table>

#####Accepted Extension: http://tincanapi.co.uk/tinrepo/verbs/accepted_extension
<table>
  <tr>
    <th>Description</th>
    <th>Authorised roles</th><th>Object</th>
  </tr>
  <tr>
    <td>The actor promoted a verb, activity type, extension or standard document to accepted status.</td>
    <td>Moderators and Administrators</td>
    <td>An activity with any of the activity types defined in this profile.</td>
  </tr>
</table>

#####Recognised Extension: http://tincanapi.co.uk/tinrepo/verbs/recognised_extension
<table>
  <tr>
    <th>Description</th>
    <th>Authorised roles</th><th>Object</th>
  </tr>
  <tr>
    <td>The actor promoted a verb, activity type, extension or standard document to recognised status.</td>
    <td>Moderators and Administrators</td>
    <td>An activity with any of the activity types defined in this profile.</td>
  </tr>
</table>

#####Revert Extension: http://tincanapi.co.uk/tinrepo/verbs/revert_extension
<table>
  <tr>
    <th>Description</th>
    <th>Authorised roles</th><th>Object</th>
  </tr>
  <tr>
    <td>The actor reverted a verb, activity type, extension or standard document to registered status.</td>
    <td>Moderators and Administrators</td>
    <td>An activity with any of the activity types defined in this profile.</td>
  </tr>
</table>

#####Deprecate Extension: http://tincanapi.co.uk/tinrepo/verbs/deprecate_extension
<table>
  <tr>
    <th>Description</th>
    <th>Authorised roles</th><th>Object</th>
  </tr>
  <tr>
    <td>The actor set a verb, activity type, extension or standard document to deprecated status.</td>
    <td>Moderators and Administrators</td>
    <td>An activity with any of the activity types defined in this profile.</td>
  </tr>
</table>

####User Management Verbs

#####Make moderator: http://tincanapi.co.uk/tinrepo/verbs/make_moderator
<table>
  <tr>
    <th>Description</th>
    <th>Authorised roles</th><th>Object</th>
  </tr>
  <tr>
    <td>The actor makes the object agent into a moderator. Reporting tools should 
    process any moderator-only actions from this agent stored following the timestamp property 
    of this statement.</td>
    <td>Administrator only</td>
    <td>Agent to be made into a moderator</td>
  </tr>
</table>

#####Revoke moderator: http://tincanapi.co.uk/tinrepo/verbs/revoke_moderator
<table>
  <tr>
    <th>Description</th>
    <th>Authorised roles</th><th>Object</th>
  </tr>
  <tr>
    <td>The actor revokes moderator rights. Reporting tools should 
    not process any moderator-only actions from this agent stored following the timestamp property 
    of this statement but should still process actions prior to this statement if the agent was
    previously a moderator. Revoking moderator privilages from an agent who is not a moderator has no effect. </td>
    <td>Administrator only</td>
    <td>Moderator agent to have mdoerator rights revoked.</td>
  </tr>
</table>


###Administrator account
There is only one administrator account. 

    "authority": {
        "account": {
            "homePage": "http://tincanapi.co.uk/tinrepo",
            "name": "admin"
        },
        "objectType": "Agent"
    }

##Components
###Public Interface
###Moderator Interface
###Admin Interface
###LRS
###Reporting Tool(s)

##Community
###Method of Operation
###Moderators and 
###Administrator
###Forum
