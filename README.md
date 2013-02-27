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

#####Reverted Extension: http://tincanapi.co.uk/tinrepo/verbs/reverted_extension
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

#####Deprecated Extension: http://tincanapi.co.uk/tinrepo/verbs/deprecated_extension
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
any number of times. The admin interface allows the administrator to select an agent from this
list and issue a statement using a 'revoke_moderator' verb and with the selected agent as the object. 

###LRS
The LRS is a standard Tin Can API LRS. It provides a means for users to register so that their statements
can be authenticated using either basic or OAuth authentication. The LRS will also accept statements 
from unregistered users so there is no need for users to register in order to submit extensions. 

The decision to accept statements from unregistered users will be revisited if required as a result
of spam. 

###Reporting Tool(s)
The reporting tool provides a list of extensions registered with the repository. These can be 
filtered by status or activity type and their activity names and descriptions can be searched for key words. 

In order to present an accurate list, taking into account the actions of authorised moderators only, reporting 
tools will compare:

* the *object* of 'make_moderator' and 'revoke_moderator' statements with the *authority* of the statement 
issued by the moderator
* the *timestamp* of the 'make_moderator' and 'revoke_moderator' statements with the *stored* property 
of the statement issued by the moderator

Only when both match will the reporting tools consider the statement issued by the moderator to be authoritative. 

The reporting tool will follow the following validation proceedure in order:

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
The table below maps verb ids to status. Note the rules in the profile about what actions are effective in what
situations. 
4. For each subsquently stored statement matching the current activity id, check if the statement has any
effect on the repositoryItem status based on the rules outlined in the profile. If it does, update the status. 
5. Repeat step 4 until the most recent matching statement. 

Once this process has been completed, the reporting tool will have a valid and concise array of data to present to
the user. 

<table>
  <tr><th>verb id used</th><th>status to set</th></tr>
  <tr>
    <td>http://tincanapi.co.uk/tinrepo/verbs/registered_extension</td>
    <td>registered</td>
  </tr>
  <tr>
    <td>http://tincanapi.co.uk/tinrepo/verbs/accepted_extension/td>
    <td>accepted/td>
  </tr>
  <tr>
    <td>http://tincanapi.co.uk/tinrepo/verbs/recognised_extension</td>
    <td>recognised</td>
  </tr>
  <tr>
    <td>http://tincanapi.co.uk/tinrepo/verbs/reverted_extension</td>
    <td>registered</td>
  </tr>
  <tr>
    <td>http://tincanapi.co.uk/tinrepo/verbs/deprecated_extension</td>
    <td>deprecated</td>
  </tr>
</table>

#Community Discussion Forum
The discussion forum provides a space for extensions to be discussed so that their status can be decided. This 
decision will then be actioned by the moderators using the moderator interface.

This component can be any existing forum.

The discussion forum and LRS are the only two components that there can only be one instance of, as they are 
shared by the whole community. There can be multiple implementations and copies of all the other tools, perhaps 
integrated into LMSs, websites and intranets. They can even be implemented as apps stored entirely on the user's 
device.

In the long run, a Tin Can powered comment and rating system can be added to the repository can be created to 
replace the discussion forum. Once this is complete, it will be possible to host multiple instances of the forum 
interface. This will allow the forum to join the rest of the tools with multiple interfaces all sharing the same 
LRS database back end. 

##Community
The repository allows anybody to register extensions quickly and easily. This allows adopters to define and share 
extensions on the fly but could lead to some duplicate or badly thought through extensions being added to the 
repository. The repository community will help to avoid this problem by helping users to define good extensions 
and find existing extensions rather than defining new ones. The community is also central to the process of approving 
extensions and recognising when they gain wide spread adoption.

When a user (the author) registers an extension, they should also create a new thread in the community discussion 
forum explaining their reasons for registering the new extension. If there are similar extensions already in the 
repository, the author should explain how their extension is different and why it is required. The community will 
then discuss the extension and come to a decision whether to to accept, recognise or deprecate the extensions. 
Extensions remain at registered status only whilst they are being discussed.

The community will revisit the status of extensions from time to to time, particularly if somebody thinks the status 
of an extension needs to be updated.

###Guidelines for selecting the status of an extension

Extensions will be deprecated if:
* they are clearly spam or vandalism
* an extension already exists which has the same purpose
* the extension name and description are not clear, and it is not possible to improve them (e.g. if the author is 
not contactable).

In the event of a badly written name or description where the intended meaning can be determined, the community will 
help with improving the definition. The definition can be updated using the activity profile API.

Extensions will be accepted if:
* the author has a requirement for the extension
* there is no existing extension that meets the author's needs
* there is no existing way of using the standard statement properties that meets the author's needs. 

Extensions will be recognised if:
* the extension is in wide use
* there is no competing extension with greater adoption.

In cases where two extensions serving the same purpose both have significant adoption, the community will choose 
one to deprecate and one to keep. Both extensions should have a note added to their descriptions that they are 
duplicates of the other so that reporting tools can handle them appropriately.

###Moderators
The role of the moderators is to support the community and record the final consensus of the community within the 
repository. Moderators don't have any greater say in the status of an extension than any other member of the community. 

The role of moderators is to:

* encourage and lead discussion of extensions on the community discussion forum
* determine and summarise concensus
* welcome and support new members
* update the status of extensions in the repository
* moderate the community discussion forum.

Moderators are chosen from and by the community. They should represent the same diverse range of people 
represented by the community.

###Administrator
There is one administrator whose sole role is to appoint and revoke moderator privileges. The administrator does 
not choose moderators, but serves the consensus of the community.

The administrator may or may not also be a moderator. Administrator privileges do not automatically confer moderator 
privileges.

##Roadmap
Because TinRepo uses Tin Can, it is actually possible to implement this repository right now using existing freely 
available tools and resources. This isn't very user friendly though and development of specific tools to support this 
repository will make things easier. This section outlines how the repository can operate at different stages of 
development. Note that because each tool is independent, they do not need to be developed in parallel. A phase 1 
admin tool can be used with a phase 57 reporting tool (this document doesn't go quite as far as phase 57, but you 
get the idea).

###Phase 0
Phase 0 means using only existing tools for the various components of the repository.

**User interface:** the TinStatement tool found at tincanapi.co.uk or the statement generator at tincanapi.com

**Moderator interface:** moderators can use the statement viewer at tincanapi.com to view extensions which have been 
submitted, and then one of the statement generator to tools to change their status.

**Administrator interface:** the administrator can use TinStatement at tincanapi.co.uk to grant and revoke moderator 
status (the statement generator at tincanapi.com does not support agent objects). He can use the statement viewer 
to check who has been granted or revoked moderator privileges previously.

**LRS:** the LRS can simply be the public LRS at tincanapi.com

**Reporting tools:** the statement viewer can be used as a reporting tool. This is very basic, but will allow users 
who know what they are doing to get most of the required information out.

**Community forum:** the issues section of this Github repository.

###Phase 1
Phase 1 is customised versions of existing tools to focus on the functions required for the component.

**User interface:** a restricted version of TinStatement that sets and hides the LRS endpoint, verb and object type and 
restricts the activity definition type to those defined in the profile.

**Moderator interface:** another restricted version of TinStatement the same as the user interface except that moderators 
can choose from a range of moderator verbs defined in the profile. Moderators can use the reporting tools to check 
what extensions exist.

**Administrator interface:** a third restricted version of TinStatement where the verbs to choose from are the 
administrator verbs defined in the profile and the statement object is an agent.

**LRS:** an instance of a standard Tin Can LRS specifically set up as the repository end point.

**Reporting tools:** a basic version of the reporting tool with no search facility and limited filtering.

**Community forum:** a forum specifically created for the repository.

###Phase 2
Phase 2 is a full version of each component as described in this document.

**User interface:** the phase 1 tool will have its UI reviewed and have help text added.

**Moderator interface:** a modified version of the reporting tool will be integrated with the phase 1 moderator interface 
so that moderators can find extensions and then click a button to open the moderator interface in a new window with 
the details of the selected extension filled in as the object of the statement. This modified reporting tool can share 
the same code base as the main reporting tool, but the button to perform moderator actions will be hidden for non 
moderators.

**Administrator interface:** a new tool based on the phase 1 moderator tool backend but with a reporting tool front end. 
This reporting tool front end will allow the administrator to find non moderators who have registered extensions and 
promote them to moderators or find moderators and revoke their moderator privileges. This tool will require the 
administrator to enter LRS credentials and actor details before use.

**LRS:** a custom LRS which only accepts valid statements as defined in the profile and reporting tool component 
description above.

**Reporting tool:** as phase one but with fully featured filtering and searching.

**Community forum:** as phase 1.

###Phase X
Additional features and phases will be added as new requirements become apparent with use of the system.



