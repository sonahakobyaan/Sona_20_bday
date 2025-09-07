import { NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";
import { google } from "googleapis";

export async function GET() {
  try {
    const auth = new GoogleAuth({
      credentials: {
        type: "service_account",
        project_id: "sonas-20th-birthday",
        private_key:
          "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCv7enUSYmSdIDy\nBGzNRp5oQ5opKS5v5krK7Bs2KkaNL+RezkaBZ98fJoApjGZqMrZq600/KC0G+ahC\nV0fmp8Z7scQg4xYOoMIPm70jfzgJk6/2FGaNXpHqVbiDzIjyQ3rbXYXQvKTirjIC\nTG8aVGPiPjzEAOpVdkUDLE6uWoWrhROtx3ppyIk9px9V20d7kjadAQ5O7Ub8RjYt\nAYAXYd9ywBTz47OxmlXHpxlBU4BHLSfxJR+jodrDSRt4bYFbaa/kMRF44n7MxeXy\nCmR8xfXxpyra1r8sUcmdOs8BDkk/Q/DwiYY/Nf9en5+Mh8cheXWOrw2hAMg2d/0N\nHHZyFFJ3AgMBAAECggEAHju+D9/VVwhTcoPlKL/GkDdx4jn0A4Hpf4bkxEGunyvI\nTKyZPDrcAq/snXdF0GFHrQcj3sMqPcUgr8ntDsvtVat+f4JW84uX3fPPJK8Ds82g\nEyN9XjUO0V0K2QeIz01eax1e1jjdAyGZcYCuJTG0ephke/CGVMp+4KU4HklrKEbs\n2PDV4c0DCp5o2l24VtWG3M4IIN0U79BwBgIxxMse1lwxqHYVQnZOIREtEybjgfEE\nbBGoTzGSXqieIWxYdxzGY7sRBfXQ+ggYexqlZntWYqMArhfv7wk6+vmKCeMBr71m\nCz1wRA35qRqe5SMLOfTj/X8Zo9L8yBJd0ZZs5d+RrQKBgQDbD2gly4q03dH4j5mt\nTZXUo9cjb1VYBU3q1BAOFqJL9M1zvHNF/X/P8AoJTrv/G4UjW+Q9XL9YmVCbb3X8\n4paThUzeVhvId4ECshpb+3DnHQhqXvW0SWnsx1uj6YamY9NfmMrg4Sv2ZO0KtdPO\nKTSkWjhrkjhi1zZ+JEK0otnfYwKBgQDNmJhAUR66DLhrxwEz4XS8NH4Cfhk0iH38\nfGLXKhX+Z4YL9FtIydrjJEO3tmcel9RJy3mKvAoaaulVG6EFFLnv3VdPw5jDreGr\nblPI+JqmVwbCL73DtP+GRhc+YVhvXhGd6NI9Riq6Sur8ldUGh0YaSRD9zIhONWUG\nk4+cdPG+3QKBgQCb/juu9mPe6jsUosXPqHkyxD12qVh/5r8Wo06PicSnDDul2CPK\nSnvSyl+LQzsSrjk/9bbxj3NfF0ZUeanunDiX8ovLpEwClD8VeVjV+ZbrrTwJ63dS\nnBjHGSwD7E8Le/jQkZCfVRmmSzaVsueSXrty8iBNUgG/OPxAFXg/A9zcewKBgBtv\nFjnW2TvIQL+Y8W8j0XjfpETe4Kwi3nTXgDTn18F3vOpRc/DVhpCyoRqdi0sIxXoH\nXbOGfe6if3os0qKj7l+0cFcjaXoK9Mb0VNfHXJN/n1ZAGplHyKT5K1bWlH9f1Qf2\nLj+g4kizgIGt2JwjZtZRE6RaK4IMG+vxusMM08k9AoGAdKGV3lf5gOpxA1skFhHR\nAcQK/oJW2D9zJAX3WholU1AGHuE4NV+PhQPwcRG8EbECu8DGn7uzEeFO/8UJusMt\nB5Mmm7wT6FGP66E+fKcctAcsQQOWNrnnabTiu1NwyUyeMHXbVguRPNgz04d9xjGF\n3120xlXGM4a7kuXbjiEBQx4=\n-----END PRIVATE KEY-----\n"?.replace(
            /\\n/g,
            "\n"
          ),
        client_email:
          "sona-s-20th-birthday@sonas-20th-birthday.iam.gserviceaccount.com",
        client_id: "114136382404868974599",
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: "1T0MrYk3Uw57puQZkuCOBVy-e6ovLIcVlq_CSYCho5bM",
      range: "Sona's 20th Birthday Celebration",
    });

    const rows = response.data.values || [];

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error("Google Sheets error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
