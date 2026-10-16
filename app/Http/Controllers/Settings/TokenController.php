<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class TokenController extends Controller
{
    /**
     * Show access token page.
     * @return InertiaResponse
     */
    public function index(): InertiaResponse
    {
        return Inertia::render('settings/token', [
            'hasToken' => false
        ]);
    }

    /**
     * Generate token.
     * @param Request $request
     * @return InertiaResponse
     */
    public function generate(Request $request)
    {
        // $form = $request->validate([
        //     'token_name' => 'required|string|min:3|max:25',
        //     // 'expire_days' => 'required|numeric'
        // ]);

        $validated = $request->validate([
            'token_name' => 'required|string|min:3|max:25',
        ]);

        $request->user()->tokens()->delete();

        $token = $request->user()->createToken(
            name: $validated['token_name'],
            abilities: ['*'],
        );

        Inertia::flash('toast', ['type' => 'success', 'message' =>  __('Token generated.')]);

        return back()->with([
            'hasToken' => true,
            'plainTextToken' => $token->plainTextToken,
            // 'toast' => ['type' => 'success', 'message' => __('Token generated.')],
        ]);

        $request->user()->tokens()->delete();

        $token = $request->user()->createToken(
            name: $form['token_name'],
            abilities: ['*'],
            // expiresAt: now()->addDays($form['expire_days'])
        );

        // dd($token);

        return Inertia::render('settings/token', [
            'hasToken' => true,
            'plainTextToken' => $request->user()->createToken(
                                name: $form['token_name'],
                                abilities: ['*'],
                                // expiresAt: now()->addDays($form['expire_days'])
                )->plainTextToken
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' =>  __('Token generated.')]);
        return back()->with(['plainTextToken' => $token]);
    }

}
