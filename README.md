TinRepo
=======

A Tin Can powered Tin Can extension repository.

NOTE: THIS IS A DRAFT DOCUMENT. URIS USED HERE ARE NOT FINAL. DO NOT IMPLEMENT!


##Introduction
###Rationale
The Tin Can community needs a central location to register verbs, activity types, extensions and standard documents 
(known collectively as extensions). This will help to ensure interoperability because adopters will be able to see 
what extensions are already in use so that they can be shared and that different tools can work together. It needs
to be really easy for anybody to register extensions, but there also needs to be a mechanism for the community to 
accept registered extensions and recognise extensions which are widely adopted. When choosing an extension the
community will be able to see which extensions are widely in use, which have been reviewed and accepted by the community,
which have been registered but not yet accepted and which have been deprecated in favour of another verb. 

This document outlines the design of a system which will meet this need. 

###Approach
The system will use a Tin Can LRS as a repository which stores extension management events as statements. 
Reporting tools will process these statements to build a list extensions. These extensions will be
categoried as:

* registered: The extension has been registered by somebody but has not yet been accepted by the community.
* accepted: The extension has been accepted by the community and a moderator has promoted it to accepted status.
* recognised: The extension has been recognised to have wide usage in the community and a moderator has promoted it
to recognised status.
* deprecated: The community has decided that this extension should not be used and have proposed an alternative. 
A moderator has assigned it deprecated status. 

The creation of moderators will also be handled by Tin Can statements issued from a single specified admin account. 

The repository system will be supported by a community which will use a specified forum to discuss registered 
extensions and agree when they should be accepted, recognised and deprecated. The community will appoint
moderators who will carry out these agreed actions within the registry. 

To support creation of the repository and supporting community, this design document will describe:

* a profile of activity types and verbs to be used within extension management and user management statements
* a specification for the component tools and which make up the repository system
* the operating principals and processes of the supporting community.

The tools which make up the repository system are:
* a public interface for registering extensions
* a moderator interface for accepting, recognising and deprecating extensions
* an administrator interface for assigning moderator privillages
* a Tin Can LRS capable of secure authentication
* a reporting tool or reporting tools for searching the repository

Note that because these tools use Tin Can, they are each completely indepedant but interoperate together. It is possible
for any third party to develop their own version of these tools to interact with the central LRS. Equally, these tools
can be pointed at any Tin Can compliant LRS.

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

####Extension Management Verbs
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
###Moderators
###Administrator
###Forum

##Roadmap
###0.1
###0.2
