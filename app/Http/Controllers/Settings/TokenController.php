<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class TokenController extends Controller
{
    /**
     * Show access token page.
     * @return InertiaResponse
     */
    public function index(Request $request): InertiaResponse
    {
        $token = $request->user()->tokens()->latest()->first();
        $isActive = $token !== null && ($token->expires_at === null || $token->expires_at->isFuture());

        return Inertia::render('settings/token', [
            'hasToken' => (bool) $token,
            'tokenName' => $token?->name,
            'active'    => $isActive
        ]);
    }

    /**
     * Generate token.
     * @param Request $request
     * @return RedirectResponse
     */
    public function generate(Request $request)
    {
        $validated = $request->validate([
            'token_name' => 'required|string|min:3|max:25',
        ]);

        $request->user()->tokens()->delete();

        $token = $request->user()->createToken(
            name: $validated['token_name'],
            abilities: ['*'],
            // expiresAt: now()->addDays(30)
        );

        Inertia::flash(['plainTextToken' => $token->plainTextToken]);
        Inertia::flash('toast', ['type' => 'success', 'message' =>  __('Token generated.')]);

        return back();
    }

    /**
     * Destroy/invalidate the token.
     * @param Request $request
     * @return RedirectResponse
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->user()->tokens()->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' =>  __('Token revoked.')]);
        return back();
    }

}
