import { Request, Response } from 'express';
import {
   CallResponseHandler,
   errorDataMessage,
   errorOpsgenieWithMessage,
   errorWithMessage,
   newErrorCallResponseWithMessage,
   newFormCallResponse,
   newOKCallResponseWithMarkdown
} from "../utils";
import { AppCallRequest, AppCallResponse } from "../types";
import {addSubscriptionCall} from "../forms/subscriptions";

export const addSubscriptionSubmit = async (request: Request, response: Response) => {
   const call: AppCallRequest = request.body;
   let callResponse: AppCallResponse;

   try {
      await addSubscriptionCall(call);
      callResponse = newOKCallResponseWithMarkdown("Subscription will be created");
      response.json(callResponse);
   } catch (error: any) {
      console.log('error', error);
      callResponse = newErrorCallResponseWithMessage('Unexpected error: ' + error.message);
      response.json(callResponse);
   }
}

/*export const createTrelloWebhookSubmit: CallResponseHandler = async (req, res) => {
   const call: AppCallRequest = req.body;

   let callResponse: AppCallResponse;
   const board = (call.values as BoardSelected).board;
   const mattermostOptions: MattermostOptions = {
      accessToken: call.context.acting_user_access_token || '',
      mattermostUrl: call.context.mattermost_site_url || ''
   }

   const mattermostClient: MattermostClient = new MattermostClient(mattermostOptions);

   try {
      const hookID = await getMattermostHookID(mattermostClient, call.context)
      const webhookURL = createHookURL(hookID);
      const form = await createWebhookForm(call, webhookURL);
      callResponse = newFormCallResponse(form);
      res.json(callResponse);
   } catch (error: any) {
      callResponse = newErrorCallResponseWithMessage(error.toString());
      return res.json(callResponse);
   }
}

const getMattermostHookID = async (mattermostClient: MattermostClient, context: AppContext): Promise<string> => {
   const channel_id = context.channel.id;
   let hook_id: string = '';
   try {
      const params = {
         f: context.channel.team_id
      }
      const listWebhooks = await mattermostClient.getIncomingWebhooks(params);
      const found = listWebhooks.find(hook => hook.channel_id === channel_id);

      if (!found) {
         const newWebhook: CreateIncomingWebhook = {
            channel_id: context.channel.id,
            display_name: 'Trello Webhook',
            description: `Added webhook to get notifications from Trello boards`,
            channel_locked: true,
            username: "Trello Webhook",
            icon_url: TrelloImagePath(context.mattermost_site_url || '')
         }
         const incomingWebhook: IncomingWebhook = await mattermostClient.createIncomingWebhook(newWebhook);
         hook_id = incomingWebhook.id;
      } else {
         hook_id = found.id;
      }

      return hook_id;
   } catch (error: any) {
      throw new Error(errorDataMessage(error.response));
   }
}

const createHookURL = (hookID: string): string => {
   return `${ getHTTPPath() }${ Routes.App.CallReceiveNotification }/${hookID}`;
}

export const createWebohookNotification = async (req: Request, res: Response) => {
   const call: TrelloWebhookResponse = req.body as TrelloWebhookResponse;
   const splitURL = req.url.split('/');
   const hookID = splitURL[splitURL.length - 1];
   const mattermostOptions: MattermostOptions = {
      accessToken: '',
      mattermostUrl: ''
   }
   let callResponse: AppCallResponse;

   try {
      const mattermostClient: MattermostClient = new MattermostClient(mattermostOptions);
      const hookMessage = trelloWebhookResponse(call);
      const postCreated = await mattermostClient.incomingWebhook(hookID, hookMessage);
      res.json(postCreated);
   } catch (error: any) {
      callResponse = newErrorCallResponseWithMessage(errorDataMessage(error.response));
      return res.json(callResponse);
   }
}*/


