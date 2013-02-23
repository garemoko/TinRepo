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
This section describes a profile of verbs and activity types used to run the repository. 
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
    <td>An activity representing a Tin Can verb.</td>
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
    <td>The actor registered a new extension with the repository.
    When used on an extension which has already been registered, accepted, recognised or deprecated, 
    this action has no effect.</td>
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
    <td>The actor promoted an extension to accepted status.
    When used on an extension which has not been registered, this action also
    registers the extension. When used on an extension which already has 
    accepted or recognised status, this action has no effect. This verb 
    cannot be used to revert recognised extensions to accepted status.</td>
    <td>Moderators only</td>
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
    <td>The actor promoted an extension to recognised status.
    When used on an extension which has not been registered, this action also
    registers the extension. When used on an extension which already has 
    recognised status, this action has no effect.</td>
    <td>Moderators only</td>
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
    <td>The actor reverted an extension to registered status. When used on an extension 
    which has not been registered, this action also register the extension. When used 
    on an extension which already has registered status, this action has no effect.</td>
    <td>Moderators only</td>
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
    <td>The actor set an extension to deprecated status. When used on an extension which 
    has not been registered, this action also registers the extension. When used 
    on an extension which already has registered status, this action has no effect.</td>
    <td>Moderators only</td>
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
There is one administrator account which is used to assign and revoke moderator privillages. The current
administrator account is listed below. The reporting tools should only process administrator only actions
sent with this authority.

    "authority": {
        "account": {
            "homePage": "http://tincanapi.co.uk/tinrepo",
            "name": "admin"
        },
        "objectType": "Agent"
    }

##Components
The tools which make up the repository system are:
* a public interface for registering extensions
* a moderator interface for accepting, recognising and deprecating extensions
* an administrator interface for assigning moderator privillages
* a Tin Can LRS capable of secure authentication
* a reporting tool or reporting tools for searching the repository

This section explains the function and purpose of each of these tools. 

###Public Interface
The public interface is open to anybody and is used to register extensions. 
This interface allows the user to enter the actor and object details of the statement. 
The verb is always 'registered_extension' described in the profile above and the object
is always an activity with one of the activity types also described above. 

###Moderator Interface
The moderator interface is designed for use by moderators, although access to
this interface does not need to be restricted. This interface provides a 
list of extensions held within the repository, so may be a specialised version
of the reporting tools.

The moderator interface will allow users to find and select an extension and
then perform one of the following actions on it using the verbs in the profile above:
* promote registered or deprecated extensions to accepted status
* promote registered, deprecated or accepted extensions to recognised status
* set any extension to deprecated status
* revert any extension to registered status.

The moderator interface will require users to enter basic or OAuth credentials so
that the authority of statements issued from the moderator interface can be 
determined by the reporting tools. The reporting tools will ignore any moderator
statements not sent with the authority of a moderator. Reporting tools can calculate
a list of moderators at a given point in time based on statements issued with
the authority of the administrator via the administrator interface. 


###Admin Interface
The admin interface is designed for use by the holder of the administrator 
account. Again, access to this interface does not need to be restricted 
because the admin interface will require users to enter basic or OAuth credentials so
that the authority of statements issued can be determined by the reporting tools. 
The reporting tools will ignore any administrator statements not sent with the 
authority of the administrator. The details of the administrator account are defined
in the profile above.

The admin interface allows the administrator to grant moderator privilages to agents. 
This is done by issuing statements with the 'make_moderator' verb described in the 
profile above. The object of the statements is an agent.

The admin interface also provides a list of agents who have been the object of a 
'make_moderator' verb more recently than they have been the object of a 'revoke_moderator'
verb. This is those agents who have been given moderator privilages but have not had them revoked,
and also allows for agents who have had moderator privilages revoked and reinistated 
any number of times. The admin interface allows the moderator to select an agent from this
list and issue a statement using a 'revoke_moderator' verb and with the selected agent as the object. 

To determine whether to use or ignore a moderator statement, reporting tools will compare:
* the *object* of 'make_moderator' and 'revoke_moderator' statements with the *authority* of the statement 
issued by the moderator
* the *timestamp* of the 'make_moderator' and 'revoke_moderator' statements with the *stored* property 
of the statement issued by the moderator

Only when both match will the reporting tools consider the statement issued by the moderator to be authoritative. 

###LRS
The LRS is a standard Tin Can API LRS. It provides a means for users to register so that their statements
can be authenticated using either basic or OAuth authentication. The LRS will also accept statements 
from unregistered users so there is no need for users to register in order to submit extensions. 

The decision to accept statements from unregistered users will be revisited if required as a result
of spam. 

###Reporting Tool(s)
The reporting tool provides a list of extensions registered with the repository. These can be 
filtered by status or activity type and their activity names and descriptions can be searched for key words. 

In order to present an accurate list, taking into account the actions of authorised moderators only, the reporting
tool will follow the following validation proceedure in order:

1. Get all statements from the LRS using the verbs defined in the profile and store them in an array.
2. For each statement, validate that the objectType and, if relevant, activity type match the profile. 
Remove any statements that fail this validation from the array. 
3. For each statement using the administrator only verbs, validate that the
authority of the statement matches the administrator account defined in the profile. Remove any statements
that fail this validation from the array. 
4. For each statement using moderator only verbs, get all 'make_moderator' or 'revoke_moderator' statements
whose object matches the authority of the statement being validated. From this list, get the most recent statement
whose timestamp is before the stored time of the statement being validated. If this statement uses a 'revoke_moderator'
verb, remove the statement being validated from the array. If not, then the verb must be 'make_moderator', meaning
that the authority of the statement being validated was a moderator when the statement was stored. The stored
property is used for the statement being validated to prevent ex-moderators from continuing to issue moderator
statements. The timestamp property is used for the user management statements to allow the administrator to
make changes to moderator privilages for peroids of time in the past, for example to de-authorise the most recent 
actions of a moderator whose account has been hacked. 

The LRS owner may wish to peroidically run these validation rules on the LRS data and delete any invalid statements.

Once a list of valid statements has been created and stored in memory, the reporting tool will remove the user management
statements from the array. These are any statements using the 'make_moderator' or 'revoke_moderator' verbs.

The array of statements can be reduced further to keep only the most recent statement about an 
extension and include only the relevant data from the statement that needs to be presented to the user. A new array 
will be declared to contain a colelction of repositoryItem objects with the following properties:

* id
* type
* name
* description
* status

id and type are URIs, name and description are language maps as defined in the Tin Can API specification and
status is a string. 

The following process will be carried out for each unique activity in the array of valid extension management 
statements:

1. Create a new repositoryItem object in the array.
2. Populate the id, type, name and description properties using activity definition data from the LRS 
Activity Profile API for the current activity id.
3. Populate the status property based on the verb id of the earliest stored statement matching the current activity id.
The table below maps verb ids to status. 
4. For each subsquently stored statement matching the current activity id, check if the statement has any
effect on the repositoryItem status based on the rules outlined in the profile. If it does, update the status. 
5. Repeat step 4 until the most recent matching statement. 

Once this process has been completed, the reporting tool will have a valid and concise array of data to present to
the user. 

##Community
###Method of Operation
###Moderators
###Administrator
###Forum

##Roadmap
###0.1
###0.2
