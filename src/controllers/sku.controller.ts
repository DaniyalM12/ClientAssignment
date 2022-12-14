import {Request, Response} from "express";
import {fetchSKUs} from "../services";
import {SkusEntity} from "../entities";
import {BaseResponse} from "../response";


export async function fetchSKU(req: Request, res: Response): Promise<Response> {
  const sku = req.query.sku as string;

  //Entry Point
  const response: BaseResponse<SkusEntity> = new BaseResponse();
  try {

    if (!sku) {
      response.errorExec(new Error("Invalid Request"));
      return res.send(response.disposeResponse());
    }

    const result = await fetchSKUs(sku);
    response.successExec(result);
  } catch (error: any) {
    response.errorExec(error);
  }

  return res.send(response.disposeResponse());
}
