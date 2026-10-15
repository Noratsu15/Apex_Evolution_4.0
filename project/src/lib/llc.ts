import { supabase } from '@/lib/supabase';
import type { LlcDocType, LlcDocument, LlcOrder, LlcPartner, LlcState } from '@/types';

const BUCKET = 'llc-documents';
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_MIME = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];

export async function fetchMyLlcOrders(): Promise<LlcOrder[]> {
  const { data, error } = await supabase
    .from('llc_orders')
    .select('*')
    .eq('payment_status', 'completed')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return ((data ?? []) as LlcOrder[]).map((o) => ({ ...o, amount_paid: Number(o.amount_paid) }));
}

export async function fetchPartners(orderId: string): Promise<LlcPartner[]> {
  const { data, error } = await supabase
    .from('llc_partners')
    .select('*')
    .eq('order_id', orderId)
    .order('created_at');
  if (error) throw new Error(error.message);
  return ((data ?? []) as LlcPartner[]).map((p) => ({ ...p, ownership_pct: Number(p.ownership_pct) }));
}

export interface IntakeInput {
  orderId: string;
  state: LlcState;
  contactEmail: string;
  contactPhone: string;
  nameOptions: string[];
  partners: { full_name: string; ownership_pct: number }[];
}

export async function submitIntake(input: IntakeInput): Promise<void> {
  const { error } = await supabase.rpc('submit_llc_intake', {
    p_order_id: input.orderId,
    p_state: input.state,
    p_contact_email: input.contactEmail,
    p_contact_phone: input.contactPhone,
    p_name_options: input.nameOptions,
    p_partners: input.partners,
  });
  if (error) throw new Error(error.message);
}

export async function saveBusinessProfile(
  orderId: string,
  description: string,
  website: string
): Promise<void> {
  const { error } = await supabase
    .from('llc_orders')
    .update({
      business_description: description.trim() || null,
      business_website: website.trim() || null,
    })
    .eq('id', orderId);
  if (error) throw new Error(error.message);
}

export async function fetchDocuments(orderId: string): Promise<LlcDocument[]> {
  const { data, error } = await supabase
    .from('llc_documents')
    .select('*')
    .eq('order_id', orderId)
    .order('created_at');
  if (error) throw new Error(error.message);
  return (data ?? []) as LlcDocument[];
}

export function validateFile(file: File): 'ok' | 'size' | 'type' {
  if (file.size > MAX_FILE_BYTES) return 'size';
  if (!ALLOWED_MIME.includes(file.type)) return 'type';
  return 'ok';
}

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-80);
}

export async function uploadDocument(params: {
  userId: string;
  orderId: string;
  docType: LlcDocType;
  label?: string;
  file: File;
}): Promise<LlcDocument> {
  const { userId, orderId, docType, label, file } = params;
  const path = `${userId}/client/${orderId}/${docType}-${Date.now()}-${safeName(file.name)}`;

  const { error: upError } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (upError) throw new Error(upError.message);

  const { data, error } = await supabase
    .from('llc_documents')
    .insert({
      order_id: orderId,
      doc_type: docType,
      source: 'client',
      label: label ?? null,
      file_name: file.name,
      storage_path: path,
    })
    .select()
    .single();

  if (error) {
    await supabase.storage.from(BUCKET).remove([path]); // do not leave orphan files
    throw new Error(error.message);
  }
  return data as LlcDocument;
}

export async function deleteDocument(doc: LlcDocument): Promise<void> {
  const { error } = await supabase.from('llc_documents').delete().eq('id', doc.id);
  if (error) throw new Error(error.message);
  await supabase.storage.from(BUCKET).remove([doc.storage_path]);
}

export async function openDocument(doc: LlcDocument): Promise<void> {
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(doc.storage_path, 60);
  if (error || !data) throw new Error(error?.message ?? 'No signed URL');
  window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
}
