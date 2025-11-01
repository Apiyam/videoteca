import { createClient } from "@supabase/supabase-js";

//const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
//const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabaseUrl="https://advvcikuydeimubwrhdr.supabase.co";
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkdnZjaWt1eWRlaW11YndyaGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1MDk5MDksImV4cCI6MjA3MjA4NTkwOX0.gSa7UpyWy82B2JFxxjTGFys55V6cbTS1lb0BkJB7DCc";

export const supabase = createClient(supabaseUrl, supabaseKey);

export const queryOne = async (entity: string, field:string, value:string) => {
    let { data: record, error } = await supabase
        .from(entity)
        .select("*")
        .eq(field, value)
        .single();
    if(record){
        return record;
    }
    return null;
}

export const query = async (entity: string, field:string, value:string | number) => {
    let { data: record, error } = await supabase
        .from(entity)
        .select("*")
        .eq(field, value);
    if(record){
        return record;
    }
    return null;
}

export const insertAndReturn = async (entity: string, rows:any) => {
    const { data, error } = await supabase
        .from(entity)
        .insert(rows)
        .select()
        .single();
    if(data){
        return data;
    }
    return null;
}

export const updateOne = async (entity: string, id: number, rows:any) => {
    const { data, error } = await supabase
        .from(entity)
        .update(rows)
        .eq('id', id)
        .select()
        .single();
    if(data){
        return data;
    }
    return null;
}

export const deleteOne = async (entity: string, id: number) => {
    const { data, error } = await supabase
        .from(entity)
        .delete()
        .eq('id', id);
    return data;
}

export const getAll = async (entity: string) => {
    const { data, error } = await supabase
        .from(entity)
        .select("*");
    return data;
}